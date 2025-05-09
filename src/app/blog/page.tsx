export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">博客文章</h1>
      <div className="grid gap-4">
        <p className="text-gray-600 dark:text-gray-400">
          这里将会展示我的技术博客文章...
        </p>
        {/* 后续可以添加博客文章列表 */}
      </div>
    </div>
  );
}