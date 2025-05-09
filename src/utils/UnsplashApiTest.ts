/**
 * Lorem Picsum API测试工具
 * 用于测试本地图片API的图片获取功能是否正常工作
 */

/**
 * 测试本地图片API获取图片功能
 * 尝试通过 /api/unsplash 获取随机图片，并返回结果
 * @param query 可选的搜索关键词（已废弃，仅保留参数兼容性）
 * @returns Promise<{success: boolean, imageUrl?: string, error?: any}>
 */
export const testUnsplashApi = async (query?: string): Promise<{success: boolean, imageUrl?: string, error?: any}> => {
  try {
    // 构建API URL
    const width = 800;
    const height = 600;
    // 兼容旧参数，实际不再传递 query
    let apiUrl = `/api/unsplash?w=${width}&h=${height}`;
    // 发送API请求
    const response = await fetch(apiUrl);
    // 检查响应状态
    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: {
          status: response.status,
          message: errorText
        }
      };
    }
    // 解析响应数据
    const data = await response.json();
    // 获取图片URL
    const imageUrl = data.url || null;
    if (!imageUrl) {
      return {
        success: false,
        error: '响应中没有找到图片URL'
      };
    }
    return {
      success: true,
      imageUrl
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};

/**
 * 在浏览器中运行测试并显示结果
 * 此函数可以在浏览器控制台中调用
 */
export const runUnsplashApiTest = async (): Promise<void> => {
  console.log('开始测试Unsplash API...');
  
  // 测试无关键词的随机图片
  console.log('测试1: 获取随机图片');
  const test1Result = await testUnsplashApi();
  console.log('测试1结果:', test1Result);
  
  // 测试带关键词的随机图片
  console.log('测试2: 获取带关键词的随机图片');
  const test2Result = await testUnsplashApi('nature,water');
  console.log('测试2结果:', test2Result);
  
  // 如果在浏览器环境中，显示图片
  if (typeof document !== 'undefined') {
    const testContainer = document.createElement('div');
    testContainer.style.padding = '20px';
    testContainer.style.maxWidth = '800px';
    testContainer.style.margin = '0 auto';
    testContainer.style.fontFamily = 'Arial, sans-serif';
    
    testContainer.innerHTML = `
      <h2>Unsplash API 测试结果</h2>
      <div style="margin-bottom: 20px;">
        <h3>测试1: 随机图片</h3>
        <p>状态: ${test1Result.success ? '成功' : '失败'}</p>
        ${test1Result.success 
          ? `<img src="${test1Result.imageUrl}" alt="随机图片" style="max-width: 100%; border-radius: 8px;" />` 
          : `<p style="color: red;">错误: ${JSON.stringify(test1Result.error)}</p>`
        }
      </div>
      
      <div>
        <h3>测试2: 带关键词的随机图片 (nature,water)</h3>
        <p>状态: ${test2Result.success ? '成功' : '失败'}</p>
        ${test2Result.success 
          ? `<img src="${test2Result.imageUrl}" alt="关键词图片" style="max-width: 100%; border-radius: 8px;" />` 
          : `<p style="color: red;">错误: ${JSON.stringify(test2Result.error)}</p>`
        }
      </div>
    `;
    
    // 添加到页面
    document.body.appendChild(testContainer);
  }
  
  console.log('Unsplash API测试完成');
};

// 如果在浏览器环境中直接运行此文件，自动执行测试
if (typeof window !== 'undefined') {
  // 添加一个全局函数，方便在控制台调用
  (window as any).testUnsplashApi = runUnsplashApiTest;
  
  console.log('Unsplash API测试工具已加载。');
  console.log('在控制台运行 testUnsplashApi() 开始测试。');
}