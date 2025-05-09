/**
 * 视频技术页面组件
 * 展示视频相关的文章列表，包括文章标题、描述、日期和分类
 * 使用响应式网格布局展示文章卡片
 * 支持分页功能，每页显示9条数据
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { videoArticles } from '../models/data';
import { getCachedImage, cacheImage, clearOldCache } from '../../utils/ImageCache';

export default function VideoPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cachedImages, setCachedImages] = useState<Record<string, string>>({});
  const itemsPerPage = 9;
  
  // 计算总页数
  const totalPages = Math.ceil(videoArticles.length / itemsPerPage);
  
  // 获取当前页的数据
  const currentItems = videoArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 页面加载时，尝试从缓存加载图片
  useEffect(() => {
    // 清除过期缓存
    clearOldCache();
    
    // 预加载当前页面的图片
    const loadCachedImages = async () => {
      const imageCache: Record<string, string> = {};
      
      // 并行加载所有图片缓存
      await Promise.all(currentItems.map(async (article) => {
        if (article.thumbnailUrl) {
          const cachedImageUrl = await getCachedImage(article.id);
          if (cachedImageUrl) {
            imageCache[article.id] = cachedImageUrl;
          }
        }
      }));
      
      setCachedImages(imageCache);
    };
    
    loadCachedImages();
  }, [currentPage]);

  // 页面变化处理函数
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // 图片加载成功处理函数
  const handleImageLoad = (articleId: string, imageUrl: string) => {
    // 将成功加载的图片缓存到IndexedDB
    if (imageUrl && !imageUrl.includes('/images/')) {
      cacheImage(articleId, imageUrl);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">视频技术</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          这里将会分享视频处理、视频编码和视频生成等相关的技术内容和研究心得。
        </p>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">文章列表</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((article) => (
              <div key={article.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={cachedImages[article.id] || (article.thumbnailUrl ? `${article.thumbnailUrl}?auto=format&fit=crop&w=800&q=80` : `/images/video-default.svg`)}
                    alt={article.title}
                    className={`w-full h-full ${article.thumbnailUrl || cachedImages[article.id] ? 'object-cover' : 'object-contain p-8'} transition-transform duration-500 hover:scale-105`}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    onLoad={() => {
                      // 图片加载成功，缓存到IndexedDB
                      if (article.thumbnailUrl && !cachedImages[article.id]) {
                        handleImageLoad(article.id, article.thumbnailUrl);
                      }
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      
                      // 如果使用的是缓存图片但加载失败，清除缓存状态
                      if (cachedImages[article.id] && target.src === cachedImages[article.id]) {
                        // 创建新的缓存对象，移除失败的缓存
                        setCachedImages(prev => {
                          const updated = {...prev};
                          delete updated[article.id];
                          return updated;
                        });
                        
                        // 尝试使用原始URL
                        if (article.thumbnailUrl) {
                          target.src = `${article.thumbnailUrl}?auto=format&fit=crop&w=800&q=80`;
                          return;
                        }
                      }
                      
                      // 如果是Unsplash URL或Picsum URL，尝试不同的参数
                      if (target.src.includes('unsplash.com') || target.src.includes('picsum.photos')) {
                        // 尝试替代URL格式
                        const altUrl = target.src.includes('random') 
                          ? target.src.replace('random', 'featured')
                          : target.src.replace(/\?.*$/, '');
                        
                        console.log('尝试替代图片URL:', altUrl);
                        target.src = altUrl;
                        
                        // 设置加载成功回调，缓存成功加载的图片
                        target.onload = () => handleImageLoad(article.id, altUrl);
                        return;
                      }
                      
                      // 最终回退到默认图片
                      if (target.src !== `/images/video-default.svg`) {
                        console.log('使用默认图片');
                        target.src = `/images/video-default.svg`;
                      }
                    }}
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{article.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <Link href={`/video/${article.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">阅读全文 →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 分页控件 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300`}
                >
                  上一页
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 text-sm font-medium ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'} border-t border-b border-gray-300 dark:border-gray-700`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300`}
                >
                  下一页
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}