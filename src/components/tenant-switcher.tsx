'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

const tenants = [
	{ id: '', label: 'Default (Blue)', color: '#2563eb' },
	{ id: 'acme', label: 'Acme Corp (Red)', color: '#dc2626' },
	{ id: 'globex', label: 'Globex (Green)', color: '#16a34a' },
	{ id: 'skylogix', label: 'SkyLogix (Purple Dark)', color: '#818cf8' },
]

export function TenantSwitcher() {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	function handleTenantChange(tenantId: string) {
		if (tenantId) {
			document.cookie = `tenant=${tenantId}; path=/; max-age=31536000`
		} else {
			document.cookie = 'tenant=; path=/; max-age=0'
		}
		startTransition(() => {
			router.refresh()
		})
	}

	return (
		<div className="flex flex-wrap items-center gap-3">
			<span className="text-sm font-medium text-brand-muted-fg">
				Switch tenant:
			</span>
			{tenants.map((tenant) => (
				<button
					key={tenant.id}
					onClick={() => handleTenantChange(tenant.id)}
					disabled={isPending}
					className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-sm font-medium text-brand-fg transition-colors hover:bg-brand-muted disabled:opacity-50"
				>
					<span
						className="h-3 w-3 rounded-full"
						style={{ backgroundColor: tenant.color }}
					/>
					{tenant.label}
				</button>
			))}
		</div>
	)
}
