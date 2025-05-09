/**
 * 图片缓存工具类
 * 使用IndexedDB存储图片数据，提供图片缓存和检索功能
 * 支持将图片数据存储为Blob对象，实现真正的本地缓存
 * 包含备用图片源和错误处理机制，提高图片加载可靠性
 */

// 检查是否在浏览器环境中
const isBrowser = typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';

// 数据库名称和版本
const DB_NAME = 'image-cache-db';
const DB_VERSION = 1;
const STORE_NAME = 'images';

// 图片源配置
// 设置为false使用在线图片源，以测试Unsplash API集成
const USE_LOCAL_IMAGES = false; // 设置为true使用本地图片，false使用在线图片

// Unsplash API配置
const UNSPLASH_API = {
  applicationId: '748943',
  accessKey: '3SJluXC35tdqT5rKHiYVVNzgLy-SkAAAQPHompi35uY',
  secretKey: 'hIPTqpYlmjQF8zIn83cEKsWi88G3Z5Figpgb_Kcaa9I',
  apiUrl: 'https://api.unsplash.com'
};

// 本地图片路径
const LOCAL_IMAGE_PATHS = [
  '/images/llm-default.svg',
  '/images/coding-default.svg',
  '/images/audio-default.svg',
  '/images/video-default.svg'
];

// 主图片源 - Unsplash (仅在USE_LOCAL_IMAGES为false时使用)
// 注意：source.unsplash.com已被标记为弃用，但仍然可用
// 正确的做法是使用Unsplash API并使用API密钥进行认证
const PRIMARY_IMAGE_SOURCE = 'https://source.unsplash.com';

// 备用图片源配置 (按可靠性排序)
const BACKUP_IMAGE_SOURCES = [
  'https://images.unsplash.com',  // Unsplash另一个域名
  'https://loremflickr.com',     // 备选服务
  'https://placekitten.com'      // 最后备选
];

// 不稳定的图片源 (应避免使用)
const UNSTABLE_SOURCES = [
  'picsum.photos',
  'fastly.picsum'
];


/**
 * 获取替代图片URL
 * 根据提供的索引获取本地图片或在线图片源的URL
 * @param originalUrl 原始图片URL
 * @param index 备用源索引，0表示使用主图片源，大于0表示使用备用源
 * @returns 替代图片URL
 */
const getAlternativeImageUrl = (originalUrl: string, index: number = 0): string => {
  // 如果设置为使用本地图片，则返回本地图片路径
  if (USE_LOCAL_IMAGES) {
    // 根据索引选择不同的本地图片，实现随机效果
    const localIndex = Math.abs(index) % LOCAL_IMAGE_PATHS.length;
    return LOCAL_IMAGE_PATHS[localIndex];
  }
  
  // 以下是在线图片源的逻辑，仅在USE_LOCAL_IMAGES为false时使用
  // 提取图片尺寸（默认800x600）
  const dimensions = originalUrl.match(/\d+\/\d+/) || ['800/600'];
  const width = 800;
  const height = 600;
  
  // 使用本地API路由代理Unsplash请求
  if (index === 0) {
    // 使用API路由获取随机图片
    return `/api/unsplash?w=${width}&h=${height}`;
  } else if (index === 1) {
    // 使用API路由获取随机图片，带主题关键词
    return `/api/unsplash?query=training,model&w=${width}&h=${height}`;
  } else if (index === 2) {
    // 使用API路由获取随机图片，带主题关键词
    return `/api/unsplash?query=ai,neural&w=${width}&h=${height}`;
  } else if (index === 3) {
    // 使用API路由获取随机图片，带主题关键词
    return `/api/unsplash?query=technology&w=${width}&h=${height}`;
  } else {
    // 使用其他备用源
    const backupIndex = (index - 4) % BACKUP_IMAGE_SOURCES.length;
    const backupSource = BACKUP_IMAGE_SOURCES[backupIndex];
    
    // 根据不同的备用源使用不同的URL格式
    if (backupSource.includes('loremflickr.com')) {
      // LoremFlickr格式: https://loremflickr.com/width/height/search_term
      return `${backupSource}/${width}/${height}/technology?random=${Date.now()}`;
    } else if (backupSource.includes('placekitten.com')) {
      // PlaceKitten格式: https://placekitten.com/width/height
      return `${backupSource}/${width}/${height}?${Date.now()}`;
    } else {
      // 通用格式
      return `${backupSource}/random/${width}x${height}?${Date.now()}`;
    }
  }
};

/**
 * 从Unsplash API获取图片URL
 * 使用本地API路由代理请求，避免CORS问题
 * @param apiUrl Unsplash API URL
 * @returns Promise<string|null> 返回图片URL或null
 */
const getUnsplashImageUrl = async (apiUrl: string): Promise<string|null> => {
  if (!isBrowser) {
    return null;
  }
  
  try {
    // 从原始URL中提取查询参数
    const url = new URL(apiUrl);
    const query = url.searchParams.get('query') || '';
    const width = url.searchParams.get('w') || '800';
    const height = url.searchParams.get('h') || '600';
    
    // 使用本地API路由代替直接请求Unsplash API
    const proxyUrl = `/api/unsplash?query=${encodeURIComponent(query)}&w=${width}&h=${height}`;
    
    const response = await fetch(proxyUrl);
    
    if (response.ok) {
      const data = await response.json();
      
      // 记录归属信息，用于显示摄影师信息
      console.log('Unsplash图片归属信息:', data.attribution);
      
      // 优先使用urls对象中的regular或small URL，如果不存在则使用兼容性url字段
      return data.urls?.regular || data.urls?.small || data.url || null;
    } else {
      console.error(`API代理请求失败: ${response.status}`, await response.text());
      return null;
    }
  } catch (error) {
    console.error('获取Unsplash图片URL失败:', error);
    return null;
  }
};

/**
 * 检查URL是否来自已知的不稳定图片源
 * @param url 要检查的URL
 * @returns 是否是不稳定源
 */
const isUnstableSource = (url: string): boolean => {
  return UNSTABLE_SOURCES.some(source => url.includes(source));
};

/**
 * 初始化IndexedDB数据库
 * @returns Promise<IDBDatabase> 返回数据库连接
 */
const initDB = (): Promise<IDBDatabase | null> => {
  // 如果不在浏览器环境中，返回null
  if (!isBrowser) {
    console.warn('IndexedDB不可用：非浏览器环境');
    return Promise.resolve(null);
  }
  
  return new Promise((resolve, reject) => {
    try {
      // 打开数据库连接
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      
      // 数据库升级事件
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // 如果存储对象不存在，则创建
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          // 创建存储对象，使用id作为键
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      
      // 数据库打开成功
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };
      
      // 数据库打开失败
      request.onerror = (event) => {
        console.error('打开数据库失败:', (event.target as IDBOpenDBRequest).error);
        reject((event.target as IDBOpenDBRequest).error);
      };
    } catch (error) {
      console.error('初始化IndexedDB失败:', error);
      resolve(null);
    }
  });
};

/**
 * 将图片URL转换为Blob对象
 * @param url 图片URL
 * @param retryCount 重试次数，用于备用源尝试
 * @returns Promise<Blob|null> 返回Blob对象或null
 */
const urlToBlob = async (url: string, retryCount: number = 0): Promise<Blob|null> => {
  if (!isBrowser) {
    return null;
  }
  
  // 检查是否是本地图片路径
  if (url.startsWith('/images/')) {
    console.log('检测到本地图片路径，跳过Blob转换:', url);
    // 对于本地图片，返回null，让应用程序直接使用img标签加载
    return null;
  }
  
  // 最大重试次数
  const MAX_RETRIES = 3;
  
  // 如果超过最大重试次数，返回null并使用本地图片
  if (retryCount > MAX_RETRIES) {
    console.error(`超过最大重试次数 (${MAX_RETRIES})，使用本地图片:`, url);
    // 返回null，让应用程序使用本地图片
    return null;
  }
  
  // 检查是否是不稳定源，如果是，直接使用本地图片
  if (isUnstableSource(url)) {
    console.log(`检测到不稳定图片源，使用本地图片替代:`, url);
    // 如果设置为使用本地图片，直接返回null
    if (USE_LOCAL_IMAGES) {
      return null;
    }
    // 否则尝试使用在线备用源
    const alternativeUrl = getAlternativeImageUrl(url, retryCount);
    return urlToBlob(alternativeUrl, retryCount + 1);
  }
  
  // 检查是否是Unsplash API URL，如果是，先获取实际的图片URL
  if (url.includes(UNSPLASH_API.apiUrl) || url.startsWith('/api/unsplash')) {
    console.log(`检测到Unsplash API URL，获取实际图片URL:`, url);
    const imageUrl = await getUnsplashImageUrl(url);
    if (imageUrl) {
      console.log(`成功获取Unsplash图片URL: ${imageUrl}`);
      // 使用获取到的实际图片URL继续处理
      return urlToBlob(imageUrl, retryCount);
    } else {
      console.error(`无法从Unsplash API获取图片URL: ${url}`);
      // 尝试备用源
      const alternativeUrl = getAlternativeImageUrl(url, retryCount + 1);
      return urlToBlob(alternativeUrl, retryCount + 1);
    }
  }
  
  // 尝试不同的fetch选项
  const fetchOptions = [
    { mode: 'cors', credentials: 'omit' },
    { mode: 'cors', credentials: 'same-origin' },
    { mode: 'no-cors' },
    {}
  ];
  
  // 尝试不同的URL格式
  const urlVariations = [
    url,
    // 移除查询参数
    url.split('?')[0],
    // 替换random为featured (如果存在)
    url.includes('random') ? url.replace('random', 'featured') : url,
    // 添加不同的缓存破坏参数
    `${url}${url.includes('?') ? '&' : '?'}cache=${Date.now()}`
  ];
  
  // 尝试所有组合
  for (const currentUrl of urlVariations) {
    for (const options of fetchOptions) {
      try {
        console.log(`尝试获取图片 (${retryCount}): ${currentUrl}`, options);
        const response = await fetch(currentUrl, options);
        
        if (response.ok) {
          const blob = await response.blob();
          if (blob.size > 0) {
            console.log(`成功获取图片Blob: ${currentUrl}`);
            return blob;
          }
        } else if (response.status === 503 || response.status === 429) {
          // 服务不可用或请求过多，尝试备用源
          console.warn(`图片服务不可用 (${response.status}): ${currentUrl}`);
          if (isUnstableSource(url)) {
            const alternativeUrl = getAlternativeImageUrl(url, retryCount);
            console.log(`尝试替代图片源:`, alternativeUrl);
            return urlToBlob(alternativeUrl, retryCount + 1);
          }
        }
      } catch (error) {
        console.warn(`获取图片失败 (${currentUrl}):`, error);
        // 继续尝试下一个选项
      }
    }
  }
  
  // 如果所有尝试都失败，且是不稳定源，尝试备用源
  if (isUnstableSource(url)) {
    const alternativeUrl = getAlternativeImageUrl(url, retryCount);
    console.log(`所有尝试失败，使用替代图片源:`, alternativeUrl);
    return urlToBlob(alternativeUrl, retryCount + 1);
  }
  
  console.error('所有获取图片尝试均失败:', url);
  return null;
};

/**
 * 将图片缓存到IndexedDB
 * @param id 图片ID，通常是文章ID
 * @param url 图片URL
 * @param forceRefresh 是否强制刷新缓存
 * @returns Promise<boolean> 返回是否缓存成功
 */
export const cacheImage = async (id: string, url: string, forceRefresh: boolean = false): Promise<boolean> => {
  // 如果不在浏览器环境中，直接返回
  if (!isBrowser) {
    return false;
  }
  
  try {
    // 检查URL是否有效
    if (!url || url.includes('/images/') || url === 'data:image/svg+xml;base64') {
      console.warn('无效的图片URL，跳过缓存:', url);
      return false;
    }
    
    // 检查是否是不稳定源，如果是，优先使用备用源
    let finalUrl = url;
    if (isUnstableSource(url)) {
      console.log(`检测到不稳定图片源: ${url}，准备使用备用源`);
      // 先尝试原始URL，如果失败再使用备用源
    }
    
    // 检查是否已经缓存过该图片（除非强制刷新）
    if (!forceRefresh) {
      const existingImage = await getCachedImage(id);
      if (existingImage) {
        console.log(`图片已存在缓存中，无需重复缓存: ${id}`);
        return true;
      }
    } else {
      console.log(`强制刷新图片缓存: ${id}`);
    }
    
    // 获取图片数据
    console.log(`开始获取图片数据: ${finalUrl}`);
    const blob = await urlToBlob(finalUrl);
    if (!blob) {
      console.error(`无法获取图片数据: ${finalUrl}`);
      
      // 如果原始URL失败，尝试使用主图片源和备用源
      // 首先尝试主图片源
      const primaryUrl = getAlternativeImageUrl(url, 0);
      console.log(`尝试主图片源: ${primaryUrl}`);
      
      // 检查是否是Unsplash API URL
      let primaryImageUrl = primaryUrl;
      if (primaryUrl.includes(UNSPLASH_API.apiUrl)) {
        const unsplashUrl = await getUnsplashImageUrl(primaryUrl);
        if (unsplashUrl) {
          primaryImageUrl = unsplashUrl;
          console.log(`成功从Unsplash API获取图片URL: ${primaryImageUrl}`);
        }
      }
      
      const primaryBlob = await urlToBlob(primaryImageUrl);
      if (primaryBlob && primaryBlob.size > 100) {
        console.log(`成功从主图片源获取图片: ${primaryImageUrl}`);
        return await saveImageToCache(id, primaryImageUrl, primaryBlob);
      }
      
      // 然后尝试所有备用源
      for (let i = 0; i < BACKUP_IMAGE_SOURCES.length; i++) {
        const backupUrl = getAlternativeImageUrl(url, i + 1);
        console.log(`尝试备用图片源 (${i+1}/${BACKUP_IMAGE_SOURCES.length}): ${backupUrl}`);
        
        // 检查是否是Unsplash API URL
        let backupImageUrl = backupUrl;
        if (backupUrl.includes(UNSPLASH_API.apiUrl)) {
          const unsplashUrl = await getUnsplashImageUrl(backupUrl);
          if (unsplashUrl) {
            backupImageUrl = unsplashUrl;
            console.log(`成功从Unsplash API获取图片URL: ${backupImageUrl}`);
          }
        }
        
        const backupBlob = await urlToBlob(backupImageUrl);
        if (backupBlob && backupBlob.size > 100) {
          console.log(`成功从备用源获取图片: ${backupImageUrl}`);
          // 使用备用源获取的Blob继续缓存流程
          return await saveImageToCache(id, backupImageUrl, backupBlob);
        }
      }
      
      return false;
    }
    
    // 检查blob大小
    if (blob.size < 100) { // 小于100字节可能是无效图片
      console.warn(`图片数据过小，可能无效: ${finalUrl}, 大小: ${blob.size}字节`);
      return false;
    }
    
    // 保存图片到缓存
    return await saveImageToCache(id, finalUrl, blob);
  } catch (error) {
    console.error('缓存图片过程中发生错误:', error);
    return false;
  }
};

/**
 * 将图片Blob保存到IndexedDB缓存
 * @param id 图片ID
 * @param url 图片URL
 * @param blob 图片Blob数据
 * @returns Promise<boolean> 是否保存成功
 */
const saveImageToCache = async (id: string, url: string, blob: Blob): Promise<boolean> => {
  if (!isBrowser) {
    return false;
  }
  
  try {
    // 打开数据库
    const db = await initDB();
    if (!db) {
      console.error('无法打开IndexedDB数据库');
      return false;
    }
    
    // 创建事务
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // 存储图片数据
    return new Promise((resolve) => {
      try {
        const request = store.put({
          id,
          blob,
          timestamp: Date.now(),
          url,
          size: blob.size,
          type: blob.type,
          isBackup: !url.includes(PRIMARY_IMAGE_SOURCE), // 标记是否为主图片源
          imageSource: url.includes(PRIMARY_IMAGE_SOURCE) ? 'primary' : 
                      BACKUP_IMAGE_SOURCES.some(src => url.includes(src)) ? 'backup' : 'original'
        });
        
        request.onsuccess = () => {
          console.log(`图片成功缓存: ${id}, 大小: ${blob.size}字节, 类型: ${blob.type}`);
          resolve(true);
        };
        
        request.onerror = (event) => {
          console.error('存储图片数据失败:', (event.target as IDBRequest).error);
          resolve(false);
        };
        
        // 关闭数据库连接
        transaction.oncomplete = () => db.close();
        transaction.onerror = () => {
          console.error('图片缓存事务失败');
          db.close();
          resolve(false);
        };
      } catch (error) {
        console.error('执行缓存操作失败:', error);
        db.close();
        resolve(false);
      }
    });
  } catch (error) {
    console.error('保存图片到缓存失败:', error);
    return false;
  }
};

/**
 * 从IndexedDB获取缓存的图片
 * @param id 图片ID，通常是文章ID
 * @param validateBlob 是否验证Blob有效性
 * @returns Promise<string|null> 返回图片的ObjectURL或null
 */
export const getCachedImage = async (id: string, validateBlob: boolean = true): Promise<string|null> => {
  // 如果不在浏览器环境中，直接返回null
  if (!isBrowser) {
    console.log('非浏览器环境，无法获取缓存图片');
    return null;
  }
  
  try {
    // 打开数据库
    const db = await initDB();
    if (!db) {
      console.warn('无法初始化IndexedDB，无法获取缓存图片');
      return null;
    }
    
    // 创建事务
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    // 获取图片数据
    return new Promise((resolve) => {
      try {
        console.log(`尝试获取缓存图片: ${id}`);
        const request = store.get(id);
        
        request.onsuccess = () => {
          try {
            const data = request.result;
            if (data && data.blob) {
              // 验证Blob是否有效
              if (validateBlob && (!data.blob.size || data.blob.size < 100)) {
                console.warn(`缓存的图片Blob无效或过小: ${id}, 大小: ${data.blob.size}字节`);
                resolve(null);
                db.close();
                return;
              }
              
              // 检查缓存是否过期（默认7天）
              const now = Date.now();
              const maxAge = 7 * 24 * 60 * 60 * 1000; // 7天
              if (now - data.timestamp > maxAge) {
                console.log(`缓存图片已过期: ${id}, 缓存时间: ${new Date(data.timestamp).toLocaleString()}`);
                resolve(null);
                db.close();
                return;
              }
              
              // 创建Blob URL
              try {
                const objectURL = URL.createObjectURL(data.blob);
                console.log(`成功从缓存加载图片: ${id}, 大小: ${data.blob.size}字节, 类型: ${data.blob.type}`);
                resolve(objectURL);
              } catch (blobError) {
                console.error('创建Blob URL失败:', blobError);
                resolve(null);
              }
            } else {
              console.log(`未找到缓存图片: ${id}`);
              resolve(null);
            }
          } catch (error) {
            console.error('处理缓存数据失败:', error);
            resolve(null);
          } finally {
            db.close();
          }
        };
        
        request.onerror = (event) => {
          console.error('获取缓存图片失败:', (event.target as IDBRequest).error);
          resolve(null);
          db.close();
        };
      } catch (error) {
        console.error('创建数据库请求失败:', error);
        resolve(null);
        db.close();
      }
    });
  } catch (error) {
    console.error('获取缓存图片过程中发生错误:', error);
    return null;
  }
};

/**
 * 清除过期的图片缓存
 * @param maxAge 最大缓存时间（毫秒），默认7天
 * @returns Promise<void>
 */
export const clearOldCache = async (maxAge: number = 7 * 24 * 60 * 60 * 1000): Promise<void> => {
  // 如果不在浏览器环境中，直接返回
  if (!isBrowser) {
    return;
  }
  
  try {
    // 打开数据库
    const db = await initDB();
    if (!db) {
      return;
    }
    
    // 创建事务
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // 获取所有缓存
    const request = store.openCursor();
    const now = Date.now();
    
    request.onsuccess = (event) => {
      try {
        const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
        
        if (cursor) {
          const data = cursor.value;
          
          // 检查是否过期
          if (now - data.timestamp > maxAge) {
            // 删除过期缓存
            cursor.delete();
            console.log(`删除过期缓存: ${data.id}`);
          }
          
          cursor.continue();
        }
      } catch (error) {
        console.error('处理缓存游标失败:', error);
      }
    };
    
    // 关闭数据库连接
    transaction.oncomplete = () => db.close();
    transaction.onerror = (event) => {
      console.error('清除缓存事务失败:', (event.target as IDBTransaction).error);
      db.close();
    };
  } catch (error) {
    console.error('清除缓存失败:', error);
  }
};