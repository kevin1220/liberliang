/**
 * 主页组件
 * 展示LLM技术相关的文章列表，包括文章标题、描述、日期和分类
 * 响应式设计：在不同屏幕尺寸下自动调整布局
 * 支持分页功能，每页显示9条数据
 */
'use client';

import { useState } from 'react';
import { llmArticles } from './models/data';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  // 计算总页数
  const totalPages = Math.ceil(llmArticles.length / itemsPerPage);
  
  // 获取当前页的数据
  const currentItems = llmArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 页面变化处理函数
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">LLM 技术</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          这里将会分享大语言模型（LLM）相关的技术内容和研究心得。
        </p>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">文章列表</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((article) => (
              <div key={article.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{article.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <a href={article.url} className="text-blue-600 dark:text-blue-400 hover:underline">阅读全文 →</a>
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