export default function HelloWorld() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
			<div className="text-center">
				<h1 className="text-6xl font-bold tracking-tight text-white">
					Hello, World
				</h1>
				<p className="mt-4 text-lg text-zinc-400">
					Deployed via Cloudflare & Github Actions preview stack.
				</p>
				<div className="mt-8 flex justify-center gap-3">
					<span className="rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/20">
						Next.js 16
					</span>
					<span className="rounded-full bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400 ring-1 ring-violet-500/20">
						Standalone SSR
					</span>
					<span className="rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400 ring-1 ring-amber-500/20">
						Docker
					</span>
					<span className="rounded-full bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 ring-1 ring-cyan-500/20">
						Neon
					</span>
				</div>
			</div>
		</div>
	)
}
