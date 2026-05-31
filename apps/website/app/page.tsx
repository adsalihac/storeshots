import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Code2,
  Github,
  GitPullRequest,
  Layers3,
  Play,
  Route,
  Smartphone,
  Sparkles,
  Zap
} from "lucide-react";
import { Badge, Card, SectionLabel, buttonVariants, cn } from "@storeshots/ui";
import { Reveal } from "@/components/reveal";

const terminalLines = [
  "$ npx storeshots",
  "",
  "✓ Found 14 routes",
  "✓ Captured screenshots",
  "✓ Generated iPhone 6.9\"",
  "✓ Generated iPhone 6.5\"",
  "✓ Generated iPad screenshots",
  "✓ Generated Android screenshots",
  "",
  "Done in 18s"
];

const features = [
  {
    icon: Route,
    title: "Route Discovery",
    description: "Reads Expo Router file conventions and turns app screens into screenshot targets automatically."
  },
  {
    icon: Smartphone,
    title: "Screenshot Capture",
    description: "Coordinates simulator navigation and captures every route without manual taps or resizing."
  },
  {
    icon: Layers3,
    title: "Device Presets",
    description: "Ships Apple and Android presets for phone and tablet store requirements."
  },
  {
    icon: Zap,
    title: "Fast Exports",
    description: "Processes retina PNG assets with deterministic folders, names, and image dimensions."
  },
  {
    icon: GitPullRequest,
    title: "CI/CD Ready",
    description: "Designed for release pipelines so screenshots can be regenerated before every store submission."
  },
  {
    icon: BadgeCheck,
    title: "Expo Native",
    description: "Built around Expo Router projects, TypeScript packages, and modern React Native workflows."
  }
];

const dxItems = ["Zero configuration", "Expo Router support", "TypeScript first", "CI/CD friendly", "Open source"];
const docsBaseUrl = process.env.NEXT_PUBLIC_DOCS_URL ?? "https://docs.storeshots.dev/docs";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#09090B]">
      <div className="grid-mask pointer-events-none absolute inset-x-0 top-0 h-[760px]" />
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <OutputPreview />
      <DeveloperExperience />
      <Documentation />
      <LaunchBanner />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#09090B]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-white">
          <Image
            src="/storeshots-mark.svg"
            alt=""
            width={32}
            height={32}
            className="rounded-md border border-zinc-800 bg-zinc-950"
          />
          Storeshots
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          <Link className="transition hover:text-white" href="#features">
            Features
          </Link>
          <Link className="transition hover:text-white" href="#docs">
            Docs
          </Link>
          <Link className="transition hover:text-white" href="#launch">
            Launch
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="https://github.com/storeshots/storeshots" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative px-5 pb-20 pt-20 sm:pt-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <Reveal>
          <Badge className="border-blue-500/30 bg-blue-500/10 text-blue-200">
            Generate App Store Screenshots from Expo Apps
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Generate App Store Screenshots in One Command
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-zinc-400">
            Automatically discover Expo Router routes, capture screenshots, and export App Store and Play Store assets.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Link href={`${docsBaseUrl}/installation`} className={buttonVariants()}>
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`${docsBaseUrl}/cli-commands`} className={buttonVariants({ variant: "secondary" })}>
              View Documentation
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.32} className="mt-12 w-full max-w-4xl">
          <TerminalWindow />
        </Reveal>
      </div>
    </section>
  );
}

function TerminalWindow() {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-[#111111] text-left shadow-2xl shadow-blue-950/20">
      <div className="flex h-11 items-center gap-2 border-b border-zinc-800 bg-zinc-950/72 px-4">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
        <span className="ml-4 font-mono text-xs text-zinc-500">storeshots generate</span>
      </div>
      <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-zinc-200 sm:p-8 sm:text-base">
        {terminalLines.map((line, index) => (
          <span key={`${line}-${index}`} className={cn(line.startsWith("✓") && "text-green-400", line.startsWith("$") && "text-blue-300")}>
            {line}
            {"\n"}
          </span>
        ))}
      </pre>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="border-y border-zinc-900 bg-[#0B0B0D] px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>Features</SectionLabel>
          <div className="mt-4 grid gap-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Everything required for store screenshots.</h2>
            <p className="max-w-2xl text-base leading-7 text-zinc-400">
              Storeshots keeps the release workflow close to the codebase: route discovery, capture orchestration, image processing, and deterministic output are packaged together.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.04}>
              <Card className="h-full p-6">
                <feature.icon className="h-5 w-5 text-blue-400" />
                <h3 className="mt-5 text-base font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{feature.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["1", "Run Storeshots", "npx storeshots"],
    ["2", "Routes are discovered", "app/profile.tsx → /profile"],
    ["3", "Screenshots are generated", "screenshots/iphone-6.9/home.png"]
  ];

  return (
    <section className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">A release task that belongs in your terminal.</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map(([number, title, command], index) => (
            <Reveal key={number} delay={index * 0.08}>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-sm font-semibold text-white">
                  {number}
                </span>
                <h3 className="mt-5 text-base font-semibold text-white">{title}</h3>
                <code className="mt-4 block rounded-md border border-zinc-800 bg-black px-3 py-3 font-mono text-sm text-zinc-300">
                  {command}
                </code>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutputPreview() {
  const tree = [
    "screenshots/",
    "  iphone-6.9/",
    "    home.png",
    "    profile.png",
    "  iphone-6.5/",
    "    home.png",
    "    profile.png",
    "  ipad-13/",
    "    home.png",
    "    profile.png",
    "  android/",
    "    home.png",
    "    profile.png"
  ];

  return (
    <section className="border-y border-zinc-900 bg-[#0B0B0D] px-5 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionLabel>Example output</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Store-ready assets with predictable paths.</h2>
          <p className="mt-5 text-base leading-7 text-zinc-400">
            Output folders are organized by device preset so screenshots can be uploaded, reviewed, or archived without renaming files by hand.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Boxes className="h-4 w-4 text-blue-400" />
                screenshots
              </div>
              <span className="font-mono text-xs text-zinc-500">PNG export</span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-zinc-300">
              {tree.map((line) => (
                <span key={line} className={cn(line.endsWith(".png") && "text-green-400")}>
                  {line}
                  {"\n"}
                </span>
              ))}
            </pre>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function DeveloperExperience() {
  return (
    <section className="px-5 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <Reveal>
          <SectionLabel>Developer experience</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Built for teams that ship mobile releases often.</h2>
          <p className="mt-5 text-base leading-7 text-zinc-400">
            The CLI uses typed package boundaries and explicit commands, so it can start simple and grow into simulator adapters, route fixtures, and CI upload flows cleanly.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="grid gap-3">
            {dxItems.map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3">
                <span className="text-sm text-zinc-200">{item}</span>
                <Sparkles className="h-4 w-4 text-green-400" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Documentation() {
  const pages = [
    ["Introduction", ""],
    ["Installation", "installation"],
    ["CLI Commands", "cli-commands"],
    ["Route Discovery", "route-discovery"],
    ["Device Presets", "device-presets"],
    ["CI/CD", "ci-cd"],
    ["Troubleshooting", "troubleshooting"]
  ];

  return (
    <section id="docs" className="border-y border-zinc-900 bg-[#0B0B0D] px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>Documentation</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">Professional docs for first-run clarity.</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pages.map(([page, slug]) => (
            <Link
              key={page}
              href={slug ? `${docsBaseUrl}/${slug}` : docsBaseUrl}
              className="group rounded-lg border border-zinc-800 bg-[#111111] p-5 transition hover:border-blue-500/70"
            >
              <Code2 className="h-4 w-4 text-zinc-500 transition group-hover:text-blue-400" />
              <span className="mt-4 block text-sm font-medium text-white">{page}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LaunchBanner() {
  return (
    <section id="launch" className="px-5 py-24">
      <Reveal>
        <div className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-blue-500/30 bg-blue-500/10 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge className="border-green-500/30 bg-green-500/10 text-green-300">Product Hunt launch</Badge>
              <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">Built for Expo Developers</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
                Stop manually creating store screenshots. Generate everything with a single command.
              </p>
            </div>
            <Link href={`${docsBaseUrl}/installation`} className={buttonVariants()}>
              <Play className="h-4 w-4" />
              Start building
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
