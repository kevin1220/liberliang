export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">项目展示</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          这里展示我参与和开发的一些有趣项目。
        </p>
        <div className="grid gap-6">
          {/* 项目卡片将在这里添加 */}
          <div className="p-4 border rounded-lg dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-2">敬请期待</h2>
            <p className="text-gray-600 dark:text-gray-400">
              项目展示即将更新...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}