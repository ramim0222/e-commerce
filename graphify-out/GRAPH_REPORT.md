# Graph Report - .  (2026-08-06)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1314 nodes · 1874 edges · 172 communities (141 shown, 31 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 191 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5e64c263`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Illuminate\Http\Request
- gray
- BM25
- search
- Edit-jjNV0TPH.js
- slide_search_core.py
- N
- spacing
- html-token-validator.py
- TestTailwindConfigGenerator
- BM25
- DesignSystemGenerator
- components.json
- design_system.py
- generate-slide.py
- TailwindConfigGenerator
- color
- main
- devDependencies
- fetch-background.py
- dependencies
- icon/generate.py
- fontSize
- TestShadcnInstaller
- _palette_is_dark
- User.php
- validate-asset.cjs
- extract-colors.cjs
- design-tokens-starter.json
- .add_components
- card
- ShadcnInstaller
- inject-brand-context.cjs
- embed-tokens.cjs
- primitive
- test_tailwind_config_gen.py
- _resolve_color_mode
- composer.json
- require-dev
- scripts
- logo/generate.py
- generate-tokens.cjs
- button
- ._base_config
- sync-brand-to-tokens.cjs
- _run
- compilerOptions
- input
- radius
- ._generate_javascript
- generate_design_system
- package.json
- Edit.jsx
- _filter_anti_patterns_for_mode
- _select_palette_for_mode
- AppServiceProvider
- config
- require
- shadow
- Welcome-CjACvcmL.js
- UserFactory
- Dropdown.jsx
- $type
- radius
- lg
- psr-4
- padding-x
- xl
- md
- none
- validate_data.py
- post-autoload-dump
- post-create-project-cmd
- test_sync_brand_to_tokens.py
- main
- primary
- destructive-foreground
- muted
- primary-foreground
- ring
- secondary-foreground
- shadcn_add.py
- .__init__
- .test_list_installed_empty
- .test_get_installed_components_empty
- .test_full_configuration_javascript
- scripts/search.py
- extra
- keywords
- TestCase
- button.jsx
- .test_add_components_subprocess_error
- .test_add_components_npx_not_found
- .test_add_components_already_installed
- .test_init_dry_run
- .test_check_shadcn_config_exists
- .test_add_components_no_components
- .test_add_color_palette
- .test_add_plugins_no_duplicates
- .test_recommend_plugins
- .test_recommend_plugins_nextjs
- .test_validate_config_no_content
- .test_init_javascript
- .test_write_config_invalid_path
- .test_add_colors
- axios
- bootstrap/app.php
- @headlessui/react
- @tailwindcss/forms
- tw-animate-css
- @vitejs/plugin-react

## God Nodes (most connected - your core abstractions)
1. `TailwindConfigGenerator` - 57 edges
2. `TestTailwindConfigGenerator` - 35 edges
3. `ShadcnInstaller` - 33 edges
4. `DesignSystemGenerator` - 27 edges
5. `TestShadcnInstaller` - 26 edges
6. `Controller` - 20 edges
7. `PrimaryButton()` - 17 edges
8. `InputError()` - 17 edges
9. `color` - 15 edges
10. `InputLabel()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `rgbToHex()` --indirect_call--> `x`  [INFERRED]
  .agents/skills/brand/scripts/extract-colors.cjs → bootstrap/ssr/ssr.js
- `TestDomainDetection` --uses--> `BM25`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_core.py → .agents/skills/design/scripts/cip/core.py
- `TestPersistence` --uses--> `BM25`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_core.py → .agents/skills/design/scripts/cip/core.py
- `TestReasoningMatch` --uses--> `BM25`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_core.py → .agents/skills/design/scripts/cip/core.py
- `TestSearchDomains` --uses--> `BM25`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_core.py → .agents/skills/design/scripts/cip/core.py

## Import Cycles
- None detected.

## Communities (172 total, 31 thin omitted)

### Community 0 - "Illuminate\Http\Request"
Cohesion: 0.08
Nodes (20): AuthenticatedSessionController, ConfirmablePasswordController, EmailVerificationNotificationController, EmailVerificationPromptController, NewPasswordController, PasswordController, PasswordResetLinkController, RegisteredUserController (+12 more)

### Community 1 - "gray"
Cohesion: 0.05
Nodes (53): $type, $value, $type, $value, $type, $value, $type, $value (+45 more)

### Community 2 - "BM25"
Cohesion: 0.06
Nodes (42): BM25, detect_domain(), get_cip_brief(), _load_csv(), Load CSV and return list of dicts, Core search function using BM25, Auto-detect the most relevant domain from query, Main search function with auto-domain detection (+34 more)

### Community 3 - "search"
Cohesion: 0.07
Nodes (28): BM25, detect_domain(), _domain_keywords(), _get_bm25(), _load_csv(), _load_product_keywords(), _normalize(), Apply synonym substitution before tokenizing. (+20 more)

### Community 4 - "Edit-jjNV0TPH.js"
Cohesion: 0.17
Nodes (25): ApplicationLogo(), ConfirmPassword(), DangerButton(), DeleteUserForm(), Modal(), SecondaryButton(), AuthenticatedLayout(), Dropdown() (+17 more)

### Community 5 - "slide_search_core.py"
Cohesion: 0.08
Nodes (36): format_context(), format_result(), main(), Format a single search result for display, Format contextual recommendations for display., BM25, calculate_pattern_break(), detect_domain() (+28 more)

### Community 6 - "N"
Cohesion: 0.09
Nodes (15): rgbToHex(), extensions, formatReport(), fs, getFiles(), main(), parseArgs(), path (+7 more)

### Community 7 - "spacing"
Cohesion: 0.06
Nodes (34): $type, $value, $type, $value, $type, $value, $type, $value (+26 more)

### Community 8 - "html-token-validator.py"
Cohesion: 0.14
Nodes (24): get_context(), is_allowed_exception(), is_allowed_rgba(), is_inside_block(), load_css_variables(), main(), print_result(), print_summary() (+16 more)

### Community 9 - "TestTailwindConfigGenerator"
Cohesion: 0.07
Nodes (14): Test adding colors multiple times., Test adding custom spacing., Test adding custom breakpoints., Test TailwindConfigGenerator class., Test generating TypeScript configuration., Test initialization with default settings., Test writing configuration to file., Test that written config contains expected content. (+6 more)

### Community 10 - "BM25"
Cohesion: 0.11
Nodes (19): BM25, detect_domain(), _load_csv(), Load CSV and return list of dicts, Core search function using BM25, Auto-detect the most relevant domain from query, Main search function with auto-domain detection, Search across all domains and combine results (+11 more)

### Community 11 - "DesignSystemGenerator"
Cohesion: 0.13
Nodes (12): DesignSystemGenerator, Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category., Apply reasoning rules to search results., Select best matching result based on priority keywords., Extract results list from search result dict. (+4 more)

### Community 12 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 13 - "design_system.py"
Cohesion: 0.13
Nodes (20): ansi_ljust(), _detect_page_type(), format_ascii_box(), format_master_md(), format_page_override_md(), _generate_intelligent_overrides(), hex_to_ansi(), persist_design_system() (+12 more)

### Community 14 - "generate-slide.py"
Cohesion: 0.15
Nodes (19): _e(), generate_chart_slide(), generate_cta_slide(), generate_deck(), generate_metrics_slide(), generate_problem_slide(), generate_solution_slide(), generate_testimonial_slide() (+11 more)

### Community 15 - "TailwindConfigGenerator"
Cohesion: 0.10
Nodes (11): Generate Tailwind CSS configuration files., Add full color palette (50-950 shades) for a base color.          Args:, TailwindConfigGenerator, Test adding custom fonts., Test generating JavaScript configuration., Test generating config with custom colors., Test generating config with plugins., Test validating valid configuration. (+3 more)

### Community 16 - "color"
Cohesion: 0.11
Nodes (19): $type, $value, background, destructive, foreground, muted-foreground, primary-hover, secondary (+11 more)

### Community 17 - "main"
Cohesion: 0.11
Nodes (10): main(), Add custom font families.          Args:             fonts: Dict of font_type, Add custom spacing values.          Args:             spacing: Dict of name:, Add custom breakpoints.          Args:             breakpoints: Dict of name:, Add plugin requirements.          Args:             plugins: List of plugin n, Get plugin recommendations based on configuration.          Returns:, Generate configuration file content.          Returns:             Configurat, Write configuration to file.          Returns:             Tuple of (success, (+2 more)

### Community 18 - "devDependencies"
Cohesion: 0.11
Nodes (19): autoprefixer, concurrently, @inertiajs/react, laravel-vite-plugin, devDependencies, autoprefixer, concurrently, @inertiajs/react (+11 more)

### Community 19 - "fetch-background.py"
Cohesion: 0.17
Nodes (17): generate_css_for_background(), get_background_image(), get_curated_images(), get_overlay_css(), get_pexels_search_url(), load_backgrounds_config(), load_brand_colors(), main() (+9 more)

### Community 20 - "dependencies"
Cohesion: 0.12
Nodes (17): @base-ui/react, class-variance-authority, clsx, @fontsource-variable/geist, gsap, lucide-react, dependencies, @base-ui/react (+9 more)

### Community 21 - "icon/generate.py"
Cohesion: 0.20
Nodes (15): apply_color(), apply_viewbox_size(), extract_svgs(), generate_batch(), generate_icon(), generate_sizes(), load_env(), main() (+7 more)

### Community 22 - "fontSize"
Cohesion: 0.12
Nodes (16): $type, $value, $type, $value, $type, $value, $type, $value (+8 more)

### Community 23 - "TestShadcnInstaller"
Cohesion: 0.14
Nodes (8): Test adding components in dry run mode., Test successful component addition., Test ShadcnInstaller class., Test adding all components without config., Create temporary project structure., Test initialization with default project root., Test getting installed components without config., TestShadcnInstaller

### Community 24 - "_palette_is_dark"
Cohesion: 0.17
Nodes (7): _palette_is_dark(), WCAG relative luminance of a #RRGGBB string, or None if unparseable., True when a colors.csv row's Background is a dark surface., _relative_luminance(), The exact reproduction from issue #428., TestEndToEndCoherence, TestLuminance

### Community 25 - "User.php"
Cohesion: 0.16
Nodes (6): User, DatabaseSeeder, Illuminate\Database\Eloquent\Factories\HasFactory, Illuminate\Database\Seeder, Illuminate\Foundation\Auth\User, Illuminate\Notifications\Notifiable

### Community 26 - "validate-asset.cjs"
Cohesion: 0.25
Nodes (13): checkManifest(), formatBytes(), formatOutput(), fs, main(), parseFilename(), path, RULES (+5 more)

### Community 27 - "extract-colors.cjs"
Cohesion: 0.24
Nodes (11): calculateCompliance(), colorDistance(), displayPalette(), extractHexColors(), findNearestBrandColor(), fs, generateImageMagickCommand(), hexToRgb() (+3 more)

### Community 28 - "design-tokens-starter.json"
Cohesion: 0.15
Nodes (12): component, $type, $value, dark, semantic, $schema, $type, $value (+4 more)

### Community 29 - ".add_components"
Cohesion: 0.22
Nodes (7): main(), Add all available shadcn/ui components.          Args:             overwrite:, List installed components.          Returns:             Tuple of (success, m, Check if shadcn is initialized in project.          Returns:             True, Get list of already installed components.          Returns:             List, Read shadcn version from project package.json; fall back to a pinned default., Add shadcn/ui components.          Args:             components: List of comp

### Community 30 - "card"
Cohesion: 0.20
Nodes (12): $type, $value, bg, bg, padding, shadow, card, bg (+4 more)

### Community 31 - "ShadcnInstaller"
Cohesion: 0.17
Nodes (7): Handle shadcn/ui component installation., ShadcnInstaller, Test adding components without shadcn config., Test adding components with overwrite flag., Test successful addition of all components., Test initialization with custom project root., Test checking for non-existent shadcn config.

### Community 32 - "inject-brand-context.cjs"
Cohesion: 0.31
Nodes (10): extractColorsFromTable(), extractCoreAttributes(), extractHexColors(), extractImageStyle(), extractTypography(), extractVoice(), fs, generatePromptAddition() (+2 more)

### Community 33 - "embed-tokens.cjs"
Cohesion: 0.20
Nodes (9): args, extractTokens(), fs, minimal, MINIMAL_TOKENS, path, projectRoot, tokensPath (+1 more)

### Community 34 - "primitive"
Cohesion: 0.18
Nodes (11): fast, normal, slow, $type, $value, $type, $value, primitive (+3 more)

### Community 35 - "test_tailwind_config_gen.py"
Cohesion: 0.20
Nodes (7): Tests for tailwind_config_gen.py, Reduce a generated TS/JS config to a bare assignable object so it can be     ha, Regression guard for the missing-comma bug between the ``theme`` block and, The property preceding ``plugins`` must end with a comma (pure-Python         c, The emitted config parses as valid JS via ``node --check``., _strip_to_object(), TestGeneratedConfigIsValidJs

### Community 36 - "_resolve_color_mode"
Cohesion: 0.24
Nodes (7): _query_wants_dark(), True when a styles.csv row describes itself as dark-first., True when the query explicitly asks for a dark theme., Resolve the mode the rest of the output has to agree with., _resolve_color_mode(), _style_is_dark_primary(), TestModeResolution

### Community 37 - "composer.json"
Cohesion: 0.18
Nodes (10): autoload-dev, psr-4, description, license, minimum-stability, name, prefer-stable, Tests\\ (+2 more)

### Community 38 - "require-dev"
Cohesion: 0.18
Nodes (11): require-dev, fakerphp/faker, fruitcake/laravel-debugbar, laravel/breeze, laravel/pail, laravel/pint, laravel/sail, mockery/mockery (+3 more)

### Community 39 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, dev, post-root-package-install, post-update-cmd, test, Composer\\Config::disableProcessTimeout, npx concurrently -c \"#93c5fd,#c4b5fd,#fdba74\" \"php artisan serve\" \"php artisan queue:listen --tries=1\" \"npm run dev\" --names='server,queue,vite, @php artisan config:clear --ansi (+3 more)

### Community 40 - "logo/generate.py"
Cohesion: 0.29
Nodes (9): enhance_prompt(), generate_batch(), generate_logo(), load_env(), main(), Enhance the logo prompt with style and industry modifiers, Generate a logo using Gemini models with image generation      Args:, Generate multiple logo variants with different styles (+1 more)

### Community 41 - "generate-tokens.cjs"
Cohesion: 0.36
Nodes (9): flattenTokens(), fs, generateCSS(), generateTailwind(), main(), parseArgs(), path, resolveReference() (+1 more)

### Community 42 - "button"
Cohesion: 0.20
Nodes (10): fg, font-size, hover-bg, button, $type, $value, $type, $value (+2 more)

### Community 43 - "._base_config"
Cohesion: 0.22
Nodes (6): Path, Initialize generator.          Args:             typescript: If True, generat, Determine default output path., Create base configuration structure., Get default content paths for framework., Any

### Community 44 - "sync-brand-to-tokens.cjs"
Cohesion: 0.33
Nodes (8): adjustBrightness(), { execFileSync }, extractColorsFromMarkdown(), fs, generateColorScale(), main(), path, updateDesignTokens()

### Community 45 - "_run"
Cohesion: 0.28
Nodes (8): Path, Regression tests for validate-tokens.cjs.  The validator used to skip any line, A hardcoded hex on the same line as a var() token is still a violation., A line that references only tokens produces no false positives., _run(), test_flags_hardcoded_hex_sharing_line_with_token(), test_token_only_line_reports_no_violation(), CompletedProcess

### Community 46 - "compilerOptions"
Cohesion: 0.22
Nodes (8): compilerOptions, baseUrl, paths, exclude, ziggy-js, node_modules, public, ./vendor/tightenco/ziggy

### Community 47 - "input"
Cohesion: 0.29
Nodes (8): padding-y, input, $type, $value, focus-ring, padding-y, $type, $value

### Community 48 - "radius"
Cohesion: 0.29
Nodes (8): $type, $value, $type, $value, radius, default, full, default

### Community 49 - "._generate_javascript"
Cohesion: 0.29
Nodes (4): Generate TypeScript configuration., Generate JavaScript configuration., Format plugins array for config.          Validates each plugin name against a, Add indentation to JSON string.

### Community 50 - "generate_design_system"
Cohesion: 0.29
Nodes (5): format_markdown(), generate_design_system(), Format design system as markdown., Main entry point for design system generation.      Args:         query: Sear, TestPersistence

### Community 51 - "package.json"
Cohesion: 0.25
Nodes (7): name, private, $schema, scripts, build, dev, type

### Community 52 - "Edit.jsx"
Cohesion: 0.36
Nodes (3): DeleteUserForm(), UpdatePasswordForm(), UpdateProfileInformation()

### Community 53 - "_filter_anti_patterns_for_mode"
Cohesion: 0.43
Nodes (3): _filter_anti_patterns_for_mode(), Drop "avoid dark mode" advice once dark mode is the resolved answer., TestAntiPatternGating

### Community 54 - "_select_palette_for_mode"
Cohesion: 0.43
Nodes (3): Pick the highest-ranked palette matching the resolved mode.      Only the dark, _select_palette_for_mode(), TestPaletteSelection

### Community 55 - "AppServiceProvider"
Cohesion: 0.33
Nodes (4): AppServiceProvider, Illuminate\Support\ServiceProvider, vite, vite

### Community 56 - "config"
Cohesion: 0.29
Nodes (7): pestphp/pest-plugin, php-http/discovery, config, allow-plugins, optimize-autoloader, preferred-install, sort-packages

### Community 57 - "require"
Cohesion: 0.29
Nodes (7): require, inertiajs/inertia-laravel, laravel/framework, laravel/sanctum, laravel/tinker, php, tightenco/ziggy

### Community 58 - "shadow"
Cohesion: 0.47
Nodes (6): sm, shadow, sm, sm, $type, $value

### Community 59 - "Welcome-CjACvcmL.js"
Cohesion: 0.80
Nodes (5): cn(), GamingButton(), Header(), HomePage(), VoucherCard()

### Community 60 - "UserFactory"
Cohesion: 0.47
Nodes (3): UserFactory, Illuminate\Database\Eloquent\Factories\Factory, static

### Community 62 - "$type"
Cohesion: 0.60
Nodes (5): $type, $value, border, border, border

### Community 63 - "radius"
Cohesion: 0.60
Nodes (5): radius, radius, radius, $type, $value

### Community 64 - "lg"
Cohesion: 0.60
Nodes (5): lg, $type, $value, lg, lg

### Community 65 - "psr-4"
Cohesion: 0.40
Nodes (5): autoload, psr-4, App\\, Database\\Factories\\, Database\\Seeders\\

### Community 66 - "padding-x"
Cohesion: 0.67
Nodes (4): padding-x, padding-x, $type, $value

### Community 67 - "xl"
Cohesion: 0.67
Nodes (4): xl, xl, $type, $value

### Community 68 - "md"
Cohesion: 0.67
Nodes (4): $type, $value, md, md

### Community 69 - "none"
Cohesion: 0.67
Nodes (4): $type, $value, none, none

### Community 70 - "validate_data.py"
Cohesion: 0.83
Nodes (3): _check_file(), main(), _read_rows()

### Community 71 - "post-autoload-dump"
Cohesion: 0.50
Nodes (4): post-autoload-dump, @php artisan clear-compiled, @php artisan config:clear, @php artisan package:discover --ansi

### Community 72 - "post-create-project-cmd"
Cohesion: 0.50
Nodes (4): post-create-project-cmd, @php artisan key:generate --ansi, @php artisan migrate --graceful --ansi, @php -r \"file_exists('database/database.sqlite') || touch('database/database.sqlite');\

### Community 75 - "primary"
Cohesion: 0.67
Nodes (3): primary, $type, $value

### Community 76 - "destructive-foreground"
Cohesion: 0.67
Nodes (3): destructive-foreground, $type, $value

### Community 77 - "muted"
Cohesion: 0.67
Nodes (3): muted, $type, $value

### Community 78 - "primary-foreground"
Cohesion: 0.67
Nodes (3): primary-foreground, $type, $value

### Community 79 - "ring"
Cohesion: 0.67
Nodes (3): ring, $type, $value

### Community 80 - "secondary-foreground"
Cohesion: 0.67
Nodes (3): secondary-foreground, $type, $value

### Community 87 - "extra"
Cohesion: 0.67
Nodes (3): extra, laravel, dont-discover

### Community 88 - "keywords"
Cohesion: 0.67
Nodes (3): keywords, framework, laravel

## Knowledge Gaps
- **219 isolated node(s):** `fs`, `path`, `fs`, `path`, `fs` (+214 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `primitive` connect `primitive` to `gray`, `spacing`, `radius`, `fontSize`, `shadow`, `design-tokens-starter.json`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `BM25` connect `BM25` to `DesignSystemGenerator`, `generate_design_system`, `search`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `component` connect `design-tokens-starter.json` to `button`, `card`, `input`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 36 inferred relationships involving `TailwindConfigGenerator` (e.g. with `TestGeneratedConfigIsValidJs` and `.test_node_check_parses_generated_config()`) actually correct?**
  _`TailwindConfigGenerator` has 36 INFERRED edges - model-reasoned connections that need verification._
- **Are the 23 inferred relationships involving `ShadcnInstaller` (e.g. with `TestShadcnInstaller` and `.test_add_all_components_dry_run()`) actually correct?**
  _`ShadcnInstaller` has 23 INFERRED edges - model-reasoned connections that need verification._
- **Are the 16 inferred relationships involving `DesignSystemGenerator` (e.g. with `TestDomainDetection` and `TestPersistence`) actually correct?**
  _`DesignSystemGenerator` has 16 INFERRED edges - model-reasoned connections that need verification._
- **What connects `fs`, `path`, `fs` to the rest of the system?**
  _219 weakly-connected nodes found - possible documentation gaps or missing edges._