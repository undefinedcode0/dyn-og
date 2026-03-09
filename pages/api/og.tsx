import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'anagnorisis'

  const fontUrl = new URL('/geistmono.ttf', req.url)
  const font = await fetch(fontUrl).then((res) => res.arrayBuffer())

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#000',
        padding: '64px 80px',
        fontFamily: 'monospace',
      }}
    >
      {/* top */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <span style={{ fontSize: 24, color: '#666' }}>undefinedcode.pages.dev</span>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '1px',
            background: 'repeating-linear-gradient(90deg, #999 0px, #999 6px, transparent 6px, transparent 12px)',
          }}
        />
      </div>

      {/* bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
          <span style={{ fontSize: 60, color: '#444' }}>//</span>
          <span style={{ fontSize: 60, color: '#e0e0e0', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{title}</span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'monospace',
          data: font,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
