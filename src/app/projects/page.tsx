/**
 * 项目展示页面组件
 * 展示个人开发的项目列表，包括项目标题、描述、使用技术、GitHub链接和演示链接
 * 使用响应式网格布局展示项目卡片
 */
import { projects } from '../models/data';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">项目展示</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          这里展示我参与和开发的一些有趣项目。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mb-3">发布时间: {project.date}</p>
                <div className="flex space-x-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      className="inline-flex items-center px-3 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      演示
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}