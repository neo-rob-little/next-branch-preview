import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'

interface TenantTheme {
	'brand-bg': string
	'brand-fg': string
	'brand-muted-fg': string
	'brand-muted': string
	'brand-border': string
	'brand-surface': string
	'brand-primary': string
	'brand-primary-fg': string
	'brand-primary-hover': string
	'brand-primary-tint': string
	'sidebar-bg': string
	'sidebar-fg': string
	'sidebar-border': string
	'sidebar-muted': string
	'sidebar-hover': string
	'sidebar-active': string
	'sidebar-active-fg': string
}

const tenantThemes: Record<string, TenantTheme> = {
	acme: {
		'brand-bg': '#ffffff',
		'brand-fg': '#0f172a',
		'brand-muted-fg': '#64748b',
		'brand-muted': '#f1f5f9',
		'brand-border': '#e2e8f0',
		'brand-surface': '#ffffff',
		'brand-primary': '#dc2626',
		'brand-primary-fg': '#ffffff',
		'brand-primary-hover': '#b91c1c',
		'brand-primary-tint': '#fef2f2',
		'sidebar-bg': '#fef2f2',
		'sidebar-fg': '#0f172a',
		'sidebar-border': '#fecaca',
		'sidebar-muted': '#64748b',
		'sidebar-hover': '#fee2e2',
		'sidebar-active': '#fecaca',
		'sidebar-active-fg': '#dc2626',
	},
	globex: {
		'brand-bg': '#ffffff',
		'brand-fg': '#14532d',
		'brand-muted-fg': '#4b5563',
		'brand-muted': '#f0fdf4',
		'brand-border': '#bbf7d0',
		'brand-surface': '#ffffff',
		'brand-primary': '#16a34a',
		'brand-primary-fg': '#ffffff',
		'brand-primary-hover': '#15803d',
		'brand-primary-tint': '#dcfce7',
		'sidebar-bg': '#f0fdf4',
		'sidebar-fg': '#14532d',
		'sidebar-border': '#bbf7d0',
		'sidebar-muted': '#4b5563',
		'sidebar-hover': '#dcfce7',
		'sidebar-active': '#bbf7d0',
		'sidebar-active-fg': '#16a34a',
	},
	skylogix: {
		'brand-bg': '#0f0f23',
		'brand-fg': '#e0e0ff',
		'brand-muted-fg': '#a5b4fc',
		'brand-muted': '#1e1e3f',
		'brand-border': '#3730a3',
		'brand-surface': '#18182f',
		'brand-primary': '#818cf8',
		'brand-primary-fg': '#0f0f23',
		'brand-primary-hover': '#a5b4fc',
		'brand-primary-tint': '#2e2e5f',
		'sidebar-bg': '#18182f',
		'sidebar-fg': '#e0e0ff',
		'sidebar-border': '#3730a3',
		'sidebar-muted': '#a5b4fc',
		'sidebar-hover': '#2e2e5f',
		'sidebar-active': '#3730a3',
		'sidebar-active-fg': '#818cf8',
	},
}

function generateThemeCSS(theme: TenantTheme): string {
	return `:root {
  --brand-bg: ${theme['brand-bg']};
  --brand-fg: ${theme['brand-fg']};
  --brand-muted-fg: ${theme['brand-muted-fg']};
  --brand-muted: ${theme['brand-muted']};
  --brand-border: ${theme['brand-border']};
  --brand-surface: ${theme['brand-surface']};
  --brand-primary: ${theme['brand-primary']};
  --brand-primary-fg: ${theme['brand-primary-fg']};
  --brand-primary-hover: ${theme['brand-primary-hover']};
  --brand-primary-tint: ${theme['brand-primary-tint']};
  --sidebar-bg: ${theme['sidebar-bg']};
  --sidebar-fg: ${theme['sidebar-fg']};
  --sidebar-border: ${theme['sidebar-border']};
  --sidebar-muted: ${theme['sidebar-muted']};
  --sidebar-hover: ${theme['sidebar-hover']};
  --sidebar-active: ${theme['sidebar-active']};
  --sidebar-active-fg: ${theme['sidebar-active-fg']};
  --background: ${theme['brand-bg']};
  --foreground: ${theme['brand-fg']};
}`
}

const getCachedThemeCSS = unstable_cache(
	async (tenantId: string) => {
		const theme = tenantThemes[tenantId]
		if (!theme) return null
		return generateThemeCSS(theme)
	},
	['tenant-theme'],
	{
		tags: ['themes'],
		revalidate: false,
	}
)

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ tenantId: string }> }
) {
	const { tenantId } = await params
	const css = await getCachedThemeCSS(tenantId)

	if (!css) {
		return new NextResponse('Theme not found', { status: 404 })
	}

	return new NextResponse(css, {
		headers: {
			'Content-Type': 'text/css',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	})
}
