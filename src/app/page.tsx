import Image from "next/image";
import { cookies, headers } from "next/headers";
import { TenantSwitcher } from "@/components/tenant-switcher";

const VALID_TENANTS = ["acme", "globex", "skylogix"];

function getTenantFromHost(host: string): string | null {
  const subdomain = host.split(".")[0];
  if (VALID_TENANTS.includes(subdomain)) {
    return subdomain;
  }
  return null;
}

export default async function Home() {
  const headersList = await headers();
  const cookieStore = await cookies();

  const host = headersList.get("host") ?? "";
  const tenantFromSubdomain = getTenantFromHost(host);
  const tenantFromCookie = cookieStore.get("tenant")?.value ?? null;
  const activeTenant = tenantFromSubdomain ?? tenantFromCookie;

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-12 bg-brand-surface px-8 py-16 font-sans sm:items-start sm:px-16">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />

      <TenantSwitcher />

      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h1 className="max-w-md text-3xl font-semibold leading-10 tracking-tight text-brand-fg">
          Dynamic Tenant Theming Demo
        </h1>
        <p className="max-w-md text-lg leading-8 text-brand-muted-fg">
          Theme is resolved server-side on first paint. Priority: subdomain &gt; cookie.
        </p>
      </div>

      <div className="w-full max-w-md rounded-lg border border-brand-border bg-brand-muted p-4 font-mono text-sm">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <span className="text-brand-muted-fg">Host:</span>
          <span className="text-brand-fg">{host}</span>
          <span className="text-brand-muted-fg">Subdomain tenant:</span>
          <span className="text-brand-fg">{tenantFromSubdomain ?? "(none)"}</span>
          <span className="text-brand-muted-fg">Cookie tenant:</span>
          <span className="text-brand-fg">{tenantFromCookie ?? "(none)"}</span>
          <span className="text-brand-muted-fg">Active tenant:</span>
          <span className="font-semibold text-brand-primary">{activeTenant ?? "default"}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        <a
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-5 text-brand-primary-fg transition-colors hover:bg-brand-primary-hover sm:w-auto"
          href="#"
        >
          Primary Action
        </a>
        <a
          className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-brand-border px-5 transition-colors hover:border-transparent hover:bg-brand-muted sm:w-auto"
          href="#"
        >
          Secondary Action
        </a>
      </div>

      <div className="w-full max-w-md rounded-lg border border-brand-border bg-brand-surface p-6">
        <h2 className="mb-3 text-lg font-semibold text-brand-fg">
          Test with Subdomains
        </h2>
        <p className="mb-3 text-sm text-brand-muted-fg">
          Add these to your <code className="rounded bg-brand-muted px-1 py-0.5">/etc/hosts</code>:
        </p>
        <pre className="overflow-x-auto rounded bg-brand-muted p-3 text-xs text-brand-fg">
{`127.0.0.1 acme.localhost
127.0.0.1 globex.localhost
127.0.0.1 skylogix.localhost`}
        </pre>
        <p className="mt-3 text-sm text-brand-muted-fg">
          Then visit <code className="rounded bg-brand-muted px-1 py-0.5">http://acme.localhost:3000</code>
        </p>
      </div>
    </main>
  );
}
