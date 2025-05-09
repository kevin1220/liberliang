/**
 * Unsplash API代理路由
 * 用于解决前端直接请求Unsplash API时的CORS问题
 * 在服务器端发起请求，避免浏览器的跨域限制
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Lorem Picsum API代理路由
 * 用于统一图片接口，避免Unsplash限流和API Key问题
 * 直接返回Lorem Picsum图片URL，无需API Key
 */
export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const width = searchParams.get('w') || '800';
    const height = searchParams.get('h') || '600';
    // 随机参数，防止缓存
    const random = Math.floor(Math.random() * 10000);
    // 构建Lorem Picsum图片URL
    const picsumUrl = `https://picsum.photos/${width}/${height}?random=${random}`;
    // 返回图片URL
    return NextResponse.json({
      url: picsumUrl,
      attribution: {
        source: 'Lorem Picsum',
        url: 'https://picsum.photos/'
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Picsum API代理错误:', error);
    return NextResponse.json(
      { error: '获取Picsum图片失败', details: (error as Error).message },
      { status: 500 }
    );
  }
}