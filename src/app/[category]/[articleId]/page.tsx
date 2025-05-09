/**
 * 文章详情页组件
 * 根据URL参数（类别和文章ID）动态展示文章详情
 * 支持图文形式展示文章内容
 * 适用于LLM、编程、音频和视频等不同类型的文章
 */
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { llmArticles, codingArticles, audioArticles, videoArticles } from '../../models/data';

// 文章内容类型（用于详情页展示）
interface ArticleContent {
  id: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  language?: string;
  tags?: string[];
  content: string; // 文章正文内容
  imageUrl?: string;
  author?: string;
  readTime?: string;
}

/**
 * 文章详情页组件
 * 根据URL参数动态获取并展示文章详情
 */
export default function ArticleDetailPage() {
  const params = useParams();
  const category = params.category as string;
  const articleId = params.articleId as string;
  
  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 模拟文章内容（实际项目中应从API获取）
  const mockContent = `
## 引言

这是一篇关于${category}技术的深度文章。我们将探讨最新的发展趋势和应用场景。

## 核心技术

在当今快速发展的技术环境中，${category}技术正在经历前所未有的变革。从基础架构到应用层面，创新无处不在。

### 关键组件

- 组件一：提供基础功能支持
- 组件二：负责数据处理和分析
- 组件三：实现用户交互界面

## 应用场景

${category}技术在多个领域有着广泛应用：

1. 企业级解决方案
2. 个人应用开发
3. 研究与教育

## 未来展望

随着技术的不断发展，我们预计在未来几年内，${category}领域将出现更多创新和突破。
  `;
  
  useEffect(() => {
    // 模拟API请求获取文章数据
    setLoading(true);
    
    let foundArticle = null;
    
    // 根据类别查找对应的文章集合
    switch(category) {
      case 'llm':
        foundArticle = llmArticles.find(a => a.id === articleId);
        break;
      case 'coding':
        foundArticle = codingArticles.find(a => a.id === articleId);
        break;
      case 'audio':
        foundArticle = audioArticles.find(a => a.id === articleId);
        break;
      case 'video':
        foundArticle = videoArticles.find(a => a.id === articleId);
        break;
      default:
        setError('未知的文章类别');
    }
    
    if (foundArticle) {
      // 将找到的文章数据转换为详情页所需格式
      setArticle({
        ...foundArticle,
        content: mockContent, // 使用模拟内容
        author: '李博',
        readTime: '10分钟阅读'
      });
      setError(null);
    } else {
      setError('未找到文章');
    }
    
    setLoading(false);
  }, [category, articleId]);
  
  // 加载状态
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  // 错误状态
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
        <Link href={`/${category}`} className="text-blue-600 hover:underline">
          返回{category === 'llm' ? 'LLM' : category === 'coding' ? '编程' : category === 'audio' ? '音频' : '视频'}文章列表
        </Link>
      </div>
    );
  }
  
  // 文章不存在
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="text-yellow-700">文章不存在或已被删除</p>
        </div>
        <Link href={`/${category}`} className="text-blue-600 hover:underline">
          返回{category === 'llm' ? 'LLM' : category === 'coding' ? '编程' : category === 'audio' ? '音频' : '视频'}文章列表
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回链接 */}
      <div className="mb-6">
        <Link href={`/${category}`} className="text-blue-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回{category === 'llm' ? 'LLM' : category === 'coding' ? '编程' : category === 'audio' ? '音频' : '视频'}文章列表
        </Link>
      </div>
      
      {/* 文章标题 */}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      
      {/* 文章元信息 */}
      <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 mb-6">
        <span className="mr-4">{article.date}</span>
        <span className="mr-4">作者: {article.author}</span>
        <span>{article.readTime}</span>
        
        {/* 分类标签 */}
        {article.category && (
          <span className="ml-4 inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
            {article.category}
          </span>
        )}
        
        {/* 编程语言标签 */}
        {article.language && (
          <span className="ml-4 inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
            {article.language}
          </span>
        )}
      </div>
      
      {/* 技术标签 */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag, index) => (
            <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* 文章特色图片 */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg mb-8">
        <img
          src={article.imageUrl ? `${article.imageUrl}?auto=format&fit=crop&w=800&q=80` : `/images/${category}-default.svg`}
          alt={article.title}
          className={`w-full h-full ${article.imageUrl ? 'object-cover' : 'object-contain p-8'} transition-transform duration-500 hover:scale-105`}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            // 检查本地存储中是否有缓存的图片
            const cachedImageUrl = localStorage.getItem(`img_cache_${article.id}`);
            
            // 如果有缓存且不是当前失败的URL，则使用缓存
            if (cachedImageUrl && cachedImageUrl !== target.src) {
              console.log('使用缓存图片:', cachedImageUrl);
              target.src = cachedImageUrl;
              return;
            }
            
            // 如果是Unsplash URL，尝试不同的参数
            if (target.src.includes('unsplash.com') || target.src.includes('picsum.photos')) {
              // 尝试替代URL格式
              const altUrl = target.src.includes('random') 
                ? target.src.replace('random', 'featured')
                : target.src.replace(/\?.*$/, '');
              
              console.log('尝试替代图片URL:', altUrl);
              target.src = altUrl;
              
              // 缓存成功加载的图片URL
              target.onload = () => {
                localStorage.setItem(`img_cache_${article.id}`, altUrl);
                console.log('图片缓存成功:', altUrl);
              };
              return;
            }
            
            // 最终回退到默认图片
            if (target.src !== `/images/${category}-default.svg`) {
              console.log('使用默认图片');
              target.src = `/images/${category}-default.svg`;
            }
          }}
        />
      </div>
      
      {/* 文章描述 */}
      <div className="mb-8 text-lg font-medium text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded">
        {article.description}
      </div>
      
      {/* 文章内容 */}
      <div className="prose dark:prose-invert max-w-none mb-8">
        {/* 将Markdown内容转换为HTML（这里简单处理，实际项目中可使用markdown-to-jsx等库） */}
        {article.content.split('\n').map((line, index) => {
          if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.substring(3)}</h2>;
          } else if (line.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{line.substring(4)}</h3>;
          } else if (line.startsWith('- ')) {
            return <li key={index} className="ml-6 mb-2">{line.substring(2)}</li>;
          } else if (line.match(/^\d+\. /)) {
            return <li key={index} className="ml-6 mb-2 list-decimal">{line.substring(line.indexOf(' ') + 1)}</li>;
          } else if (line.trim() === '') {
            return <br key={index} />;
          } else {
            return <p key={index} className="mb-4">{line}</p>;
          }
        })}
      </div>
      
      {/* 相关文章推荐（示例） */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-2xl font-bold mb-6">相关推荐</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">相关{category}文章 {i+1}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">这是一篇与当前文章相关的{category}技术文章，探讨了相关技术的应用和发展。</p>
                <div className="flex justify-end">
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">阅读全文 →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}