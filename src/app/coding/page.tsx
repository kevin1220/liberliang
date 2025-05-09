/**
 * 编程技术页面组件
 * 展示编程相关的文章列表，包括文章标题、描述、日期、编程语言和标签
 * 使用响应式网格布局展示文章卡片
 */
import { codingArticles } from '../models/data';

export default function CodingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">编程技术</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          在这里，我会分享一些编程相关的技术内容，包括编程语言学习笔记、开发工具使用技巧、实用代码片段和项目开发经验。
        </p>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">文章列表</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {codingArticles.map((article) => (
              <div key={article.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full mb-2">
                    {article.language}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{article.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <a href={article.url} className="text-blue-600 dark:text-blue-400 hover:underline">阅读全文 →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}