export default function CodingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">编程技术</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          在这里，我会分享一些编程相关的技术内容，包括：
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>编程语言学习笔记</li>
          <li>开发工具使用技巧</li>
          <li>实用代码片段</li>
          <li>项目开发经验</li>
        </ul>
        <p>
          敬请期待更多精彩内容...
        </p>
      </div>
    </div>
  );
}