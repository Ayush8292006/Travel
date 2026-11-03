Add-Type -AssemblyName System.Drawing

$images = @(
    # HEROES (2400 x 1350)
    @{ name="hero-spiti"; w=2400; h=1350; title="SPITI VALLEY"; subtitle="Trans-Himalayan Cold Desert • 4,270m"; coords="32.2461° N, 78.0349° E"; skyTop="#1c2430"; skyBot="#d99b66"; mtColor="#3a2e2b"; style="mountains" },
    @{ name="hero-kashmir"; w=2400; h=1350; title="KASHMIR VALLEY"; subtitle="Alpine Meadows & Nigeen Lake • 2,650m"; coords="34.0837° N, 74.7973° E"; skyTop="#1a2e3b"; skyBot="#a3c4bc"; mtColor="#2c3e35"; style="lake" },
    @{ name="hero-rajasthan"; w=2400; h=1350; title="THE GREAT THAR"; subtitle="Jaisalmer Golden Dunes & Citadels • 225m"; coords="26.9157° N, 70.9083° E"; skyTop="#4a2511"; skyBot="#e29547"; mtColor="#b86b28"; style="dunes" },
    @{ name="hero-ladakh"; w=2400; h=1350; title="LADAKH HIGHLANDS"; subtitle="Pangong Tso & High Mountain Passes • 4,350m"; coords="34.1526° N, 77.5771° E"; skyTop="#0f1f38"; skyBot="#6fa8dc"; mtColor="#2b3340"; style="lake" },

    # DESTINATIONS (1200 x 1600)
    @{ name="dest-spiti"; w=1200; h=1600; title="Spiti Valley"; subtitle="Himachal Pradesh"; coords="32.24° N, 78.03° E"; skyTop="#1e2638"; skyBot="#c28e6c"; mtColor="#382d28"; style="mountains" },
    @{ name="dest-kashmir"; w=1200; h=1600; title="Kashmir"; subtitle="Western Himalaya"; coords="34.08° N, 74.80° E"; skyTop="#1b303d"; skyBot="#9dbfb6"; mtColor="#253830"; style="lake" },
    @{ name="dest-manali"; w=1200; h=1600; title="Manali & Lahaul"; subtitle="Cedar Ridges"; coords="32.24° N, 77.19° E"; skyTop="#1d2d3a"; skyBot="#7da288"; mtColor="#1f3325"; style="mountains" },
    @{ name="dest-ladakh"; w=1200; h=1600; title="Ladakh"; subtitle="Moonland of High Passes"; coords="34.15° N, 77.58° E"; skyTop="#0e1d33"; skyBot="#5b8bb8"; mtColor="#252f3b"; style="lake" },
    @{ name="dest-rajasthan"; w=1200; h=1600; title="Rajasthan"; subtitle="Thar Citadels"; coords="26.92° N, 70.91° E"; skyTop="#42210e"; skyBot="#d48b42"; mtColor="#995721"; style="dunes" },
    @{ name="dest-kerala"; w=1200; h=1600; title="Kerala"; subtitle="Vembanad Backwaters"; coords="9.49° N, 76.33° E"; skyTop="#132e29"; skyBot="#76a88b"; mtColor="#1b4033"; style="lake" },
    @{ name="dest-goa"; w=1200; h=1600; title="Goa Coast"; subtitle="South Goa Coves"; coords="15.29° N, 74.12° E"; skyTop="#2b1a3d"; skyBot="#e0956b"; mtColor="#593122"; style="lake" },

    # TRIPS (1200 x 900)
    @{ name="trip-1"; w=1200; h=900; title="Spiti Circuit Expedition"; subtitle="8D/7N • High Mountain Passes"; coords="Kaza • Chandratal"; skyTop="#1a2433"; skyBot="#d1986e"; mtColor="#362923"; style="mountains" },
    @{ name="trip-2"; w=1200; h=900; title="Kashmir Alpine Sanctuary"; subtitle="6D/5N • Srinagar & Pahalgam"; coords="Dal Lake • Lidder"; skyTop="#1b303d"; skyBot="#a6c8bf"; mtColor="#283b32"; style="lake" },
    @{ name="trip-3"; w=1200; h=900; title="Manali & Lahaul Highlands"; subtitle="5D/4N • Rohtang & Sissu"; coords="Solang • Atal Tunnel"; skyTop="#1e2c38"; skyBot="#82aa8e"; mtColor="#1f3326"; style="mountains" },
    @{ name="trip-4"; w=1200; h=900; title="Ladakh High-Pass Odyssey"; subtitle="7D/6N • Pangong & Nubra"; coords="Khardung La • Diskit"; skyTop="#101e33"; skyBot="#6b9bc7"; mtColor="#25303d"; style="lake" },
    @{ name="trip-5"; w=1200; h=900; title="Royal Rajasthan Heritage"; subtitle="6D/5N • Jaisalmer & Jodhpur"; coords="Sam Dunes • Mehrangarh"; skyTop="#402010"; skyBot="#db8d48"; mtColor="#945424"; style="dunes" },
    @{ name="trip-6"; w=1200; h=900; title="Kerala Backwaters Retreat"; subtitle="5D/4N • Alleppey & Kumarakom"; coords="Vembanad • Houseboat"; skyTop="#142e2a"; skyBot="#78ab8d"; mtColor="#1b3d32"; style="lake" },
    @{ name="trip-7"; w=1200; h=900; title="Goa Coastal Slow Travel"; subtitle="4D/3N • Cabo de Rama"; coords="Palolem • Cola Beach"; skyTop="#2e1b3d"; skyBot="#e39970"; mtColor="#5c3426"; style="lake" },
    @{ name="trip-8"; w=1200; h=900; title="Hampta Pass Trek"; subtitle="5D/4N • High Alpine Crossing"; coords="Chika • Balu Ka Ghera"; skyTop="#192736"; skyBot="#c7926b"; mtColor="#302621"; style="mountains" },

    # MOMENTS (720 x 1280)
    @{ name="moment-1"; w=720; h=1280; title="Open Roads, No Rush"; subtitle="Spiti Valley • 4,270m"; coords="Shared by Arundhati D."; skyTop="#1c2430"; skyBot="#d99b66"; mtColor="#3a2e2b"; style="mountains" },
    @{ name="moment-2"; w=720; h=1280; title="Above the Tree Line"; subtitle="Lahaul • Himachal"; coords="Shared by Rohan K."; skyTop="#1d2d3a"; skyBot="#7da288"; mtColor="#1f3325"; style="mountains" },
    @{ name="moment-3"; w=720; h=1280; title="First Light, Together"; subtitle="Ladakh • Nubra"; coords="Shared by Devansh S."; skyTop="#0f1f38"; skyBot="#6fa8dc"; mtColor="#2b3340"; style="lake" },
    @{ name="moment-4"; w=720; h=1280; title="The Long Climb"; subtitle="Hampta Pass • 4,270m"; coords="Shared by Ishaan M."; skyTop="#1e2638"; skyBot="#c28e6c"; mtColor="#382d28"; style="mountains" },
    @{ name="moment-5"; w=720; h=1280; title="Morning on the Lake"; subtitle="Srinagar • Kashmir"; coords="Shared by Kabir & Rhea"; skyTop="#1a2e3b"; skyBot="#a3c4bc"; mtColor="#2c3e35"; style="lake" },
    @{ name="moment-6"; w=720; h=1280; title="Dunes at Dusk"; subtitle="Jaisalmer • Rajasthan"; coords="Shared by Meera N."; skyTop="#4a2511"; skyBot="#e29547"; mtColor="#b86b28"; style="dunes" },

    # TRAVELERS (600 x 600)
    @{ name="traveler-1"; w=600; h=600; title="Arundhati D."; subtitle="Spiti Valley Guest"; coords="Bengaluru"; skyTop="#2b2520"; skyBot="#8a6d59"; mtColor="#1c1613"; style="portrait" },
    @{ name="traveler-2"; w=600; h=600; title="Kabir & Rhea"; subtitle="Kashmir Meadows"; coords="Mumbai"; skyTop="#20292b"; skyBot="#647d7c"; mtColor="#141c1d"; style="portrait" },
    @{ name="traveler-3"; w=600; h=600; title="Devansh S."; subtitle="Ladakh Circuit"; coords="New Delhi"; skyTop="#1e242e"; skyBot="#63758a"; mtColor="#12171f"; style="portrait" },
    @{ name="traveler-4"; w=600; h=600; title="Meera N."; subtitle="Thar Wilderness"; coords="Hyderabad"; skyTop="#302018"; skyBot="#87614e"; mtColor="#1f140e"; style="portrait" },

    # INSTAGRAM (800 x 800)
    @{ name="insta-1"; w=800; h=800; title="Trail Stories"; subtitle="Himalayan Pass"; coords="@trailstories.in"; skyTop="#192330"; skyBot="#c48e66"; mtColor="#332722"; style="mountains" },
    @{ name="insta-2"; w=800; h=800; title="Morning Chai"; subtitle="Key Monastery"; coords="@trailstories.in"; skyTop="#2b1f1a"; skyBot="#c28b5b"; mtColor="#38281f"; style="dunes" },
    @{ name="insta-3"; w=800; h=800; title="Prayer Flags"; subtitle="Khardung La 5359m"; coords="@trailstories.in"; skyTop="#101e33"; skyBot="#588ab8"; mtColor="#242e3b"; style="mountains" },
    @{ name="insta-4"; w=800; h=800; title="Quiet Shallows"; subtitle="Vembanad Waterway"; coords="@trailstories.in"; skyTop="#142c26"; skyBot="#6ea083"; mtColor="#1c3b31"; style="lake" },
    @{ name="insta-5"; w=800; h=800; title="Desert Forts"; subtitle="Jaisalmer Bastions"; coords="@trailstories.in"; skyTop="#3d1e0d"; skyBot="#d48a44"; mtColor="#8f5022"; style="dunes" },
    @{ name="insta-6"; w=800; h=800; title="South Goa Gold"; subtitle="Cola Lagoon"; coords="@trailstories.in"; skyTop="#2e193b"; skyBot="#e09467"; mtColor="#573022"; style="lake" },
    @{ name="insta-7"; w=800; h=800; title="High Passes"; subtitle="Chang La Ascent"; coords="@trailstories.in"; skyTop="#172433"; skyBot="#bda086"; mtColor="#2e2a27"; style="mountains" },
    @{ name="insta-8"; w=800; h=800; title="Campfire Tales"; subtitle="Under the Milky Way"; coords="@trailstories.in"; skyTop="#090f17"; skyBot="#2d3345"; mtColor="#14161f"; style="mountains" },

    # OG DEFAULT (1200 x 630)
    @{ name="og-default"; w=1200; h=630; title="TRAIL STORIES"; subtitle="Quiet Luxury & Slow Adventure in India"; coords="@trailstories.in"; skyTop="#1c2430"; skyBot="#d99b66"; mtColor="#3a2e2b"; style="mountains" }
)

# Ensure directories exist
$dirs = @("public/images", "public/images/real")
foreach ($d in $dirs) {
    if (-not (Test-Path $d)) {
        New-Item -ItemType Directory -Path $d -Force | Out-Null
    }
}

function HexToColor($hex) {
    return [System.Drawing.ColorTranslator]::FromHtml($hex)
}

foreach ($item in $images) {
    $w = $item.w
    $h = $item.h
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

    # 1. Sky Gradient
    $topCol = HexToColor $item.skyTop
    $botCol = HexToColor $item.skyBot
    $skyRect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $skyBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $skyRect, $topCol, $botCol, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
    $g.FillRectangle($skyBrush, $skyRect)
    $skyBrush.Dispose()

    # 2. Scenery Landscape Layers
    $mtCol = HexToColor $item.mtColor
    $mtBrush = New-Object System.Drawing.SolidBrush $mtCol
    $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(180, $mtCol.R, $mtCol.G, $mtCol.B))

    if ($item.style -eq "mountains") {
        # Distant mountain ridge
        $pts1 = @(
            (New-Object System.Drawing.Point 0, ($h * 0.65)),
            (New-Object System.Drawing.Point ($w * 0.2), ($h * 0.45)),
            (New-Object System.Drawing.Point ($w * 0.4), ($h * 0.58)),
            (New-Object System.Drawing.Point ($w * 0.65), ($h * 0.38)),
            (New-Object System.Drawing.Point ($w * 0.85), ($h * 0.52)),
            (New-Object System.Drawing.Point $w, ($h * 0.42)),
            (New-Object System.Drawing.Point $w, $h),
            (New-Object System.Drawing.Point 0, $h)
        )
        $g.FillPolygon($accentBrush, $pts1)

        # Foreground jagged peaks
        $pts2 = @(
            (New-Object System.Drawing.Point 0, ($h * 0.72)),
            (New-Object System.Drawing.Point ($w * 0.3), ($h * 0.55)),
            (New-Object System.Drawing.Point ($w * 0.5), ($h * 0.68)),
            (New-Object System.Drawing.Point ($w * 0.78), ($h * 0.50)),
            (New-Object System.Drawing.Point $w, ($h * 0.62)),
            (New-Object System.Drawing.Point $w, $h),
            (New-Object System.Drawing.Point 0, $h)
        )
        $g.FillPolygon($mtBrush, $pts2)
    }
    elseif ($item.style -eq "dunes") {
        # Smooth desert dunes
        $pts1 = @(
            (New-Object System.Drawing.Point 0, ($h * 0.60)),
            (New-Object System.Drawing.Point ($w * 0.35), ($h * 0.52)),
            (New-Object System.Drawing.Point ($w * 0.7), ($h * 0.62)),
            (New-Object System.Drawing.Point $w, ($h * 0.48)),
            (New-Object System.Drawing.Point $w, $h),
            (New-Object System.Drawing.Point 0, $h)
        )
        $g.FillPolygon($accentBrush, $pts1)

        $pts2 = @(
            (New-Object System.Drawing.Point 0, ($h * 0.75)),
            (New-Object System.Drawing.Point ($w * 0.45), ($h * 0.65)),
            (New-Object System.Drawing.Point ($w * 0.8), ($h * 0.72)),
            (New-Object System.Drawing.Point $w, ($h * 0.60)),
            (New-Object System.Drawing.Point $w, $h),
            (New-Object System.Drawing.Point 0, $h)
        )
        $g.FillPolygon($mtBrush, $pts2)
    }
    elseif ($item.style -eq "lake") {
        # Mountain backdrop
        $pts1 = @(
            (New-Object System.Drawing.Point 0, ($h * 0.55)),
            (New-Object System.Drawing.Point ($w * 0.25), ($h * 0.40)),
            (New-Object System.Drawing.Point ($w * 0.55), ($h * 0.50)),
            (New-Object System.Drawing.Point ($w * 0.8), ($h * 0.35)),
            (New-Object System.Drawing.Point $w, ($h * 0.45)),
            (New-Object System.Drawing.Point $w, ($h * 0.65)),
            (New-Object System.Drawing.Point 0, ($h * 0.65))
        )
        $g.FillPolygon($accentBrush, $pts1)

        # Still reflective water mirror
        $waterRect = New-Object System.Drawing.Rectangle 0, ($h * 0.65), $w, ($h * 0.35)
        $waterBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(200, $botCol.R, $botCol.G, $botCol.B))
        $g.FillRectangle($waterBrush, $waterRect)
        $waterBrush.Dispose()

        # Foreground shoreline
        $shorePts = @(
            (New-Object System.Drawing.Point 0, ($h * 0.88)),
            (New-Object System.Drawing.Point ($w * 0.4), ($h * 0.82)),
            (New-Object System.Drawing.Point ($w * 0.7), ($h * 0.90)),
            (New-Object System.Drawing.Point $w, ($h * 0.85)),
            (New-Object System.Drawing.Point $w, $h),
            (New-Object System.Drawing.Point 0, $h)
        )
        $g.FillPolygon($mtBrush, $shorePts)
    }
    else {
        # Portrait circle avatar
        $cx = $w / 2
        $cy = $h * 0.45
        $rad = $w * 0.25
        $avatarBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(239, 231, 218))
        $g.FillEllipse($avatarBrush, ($cx - $rad), ($cy - $rad), ($rad * 2), ($rad * 2))
        $avatarBrush.Dispose()

        $headBrush = New-Object System.Drawing.SolidBrush $mtCol
        $g.FillEllipse($headBrush, ($cx - $rad * 0.5), ($cy - $rad * 0.6), ($rad), ($rad))
        $g.FillPie($headBrush, ($cx - $rad * 0.8), ($cy + $rad * 0.1), ($rad * 1.6), ($rad * 1.2), 180, 180)
        $headBrush.Dispose()
    }
    $mtBrush.Dispose()
    $accentBrush.Dispose()

    # 3. Vignette Frame
    $vigBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (New-Object System.Drawing.Rectangle 0, ($h * 0.5), $w, ($h * 0.5)), [System.Drawing.Color]::FromArgb(0, 0, 0, 0), [System.Drawing.Color]::FromArgb(160, 0, 0, 0), [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
    $g.FillRectangle($vigBrush, (New-Object System.Drawing.Rectangle 0, ($h * 0.5), $w, ($h * 0.5)))
    $vigBrush.Dispose()

    # 4. Editorial Typography & Monogram Watermark
    $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(240, 255, 255, 255))
    $goldBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(230, 217, 203, 181))
    
    $fontFamily = [System.Drawing.FontFamily]::GenericSerif
    $fontSizeTitle = [Math]::Max(18, [int]($w * 0.038))
    $fontSizeSub = [Math]::Max(11, [int]($w * 0.016))

    $fontTitle = New-Object System.Drawing.Font $fontFamily, $fontSizeTitle, [System.Drawing.FontStyle]::Bold
    $fontSub = New-Object System.Drawing.Font [System.Drawing.FontFamily]::GenericSansSerif, $fontSizeSub, [System.Drawing.FontStyle]::Regular

    # Top brand badge
    $brandFont = New-Object System.Drawing.Font [System.Drawing.FontFamily]::GenericSansSerif, [Math]::Max(9, [int]($w * 0.012)), [System.Drawing.FontStyle]::Regular
    $g.DrawString("TRAIL STORIES • CURATED EXPEDITIONS", $brandFont, $goldBrush, ($w * 0.06), ($h * 0.06))
    $brandFont.Dispose()

    # Bottom caption
    $textY = $h * 0.82
    if ($item.style -eq "portrait") { $textY = $h * 0.78 }
    $g.DrawString($item.title, $fontTitle, $whiteBrush, ($w * 0.06), $textY)
    $g.DrawString($item.subtitle + "  |  " + $item.coords, $fontSub, $goldBrush, ($w * 0.06), ($textY + $fontSizeTitle * 1.35))

    $fontTitle.Dispose()
    $fontSub.Dispose()
    $whiteBrush.Dispose()
    $goldBrush.Dispose()
    $g.Dispose()

    # 5. Save as WebP (with JPEG encoder) and JPG
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq "JPEG" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 82L

    # Save to public/images and public/images/real
    $baseName = $item.name
    $exts = @(".webp", ".jpg")
    foreach ($ext in $exts) {
        $p1 = "public/images/$baseName$ext"
        $p2 = "public/images/real/$baseName$ext"
        $bmp.Save($p1, $codec, $encoderParams)
        $bmp.Save($p2, $codec, $encoderParams)
    }

    $bmp.Dispose()
    $encoderParams.Dispose()
    Write-Host "Generated: $baseName (.webp + .jpg)"
}

Write-Host "All assets generated successfully!"

