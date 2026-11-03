using System;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public class ImageGen {
    public static void GenerateAll() {
        var items = new [] {
            // HEROES (2400 x 1350)
            new { name="hero-spiti", w=2400, h=1350, title="SPITI VALLEY", sub="Trans-Himalayan Cold Desert • 4,270m", coords="32.2461° N, 78.0349° E", sky1="#15212e", sky2="#d99962", mt="#2e2420", style="mt" },
            new { name="hero-kashmir", w=2400, h=1350, title="KASHMIR VALLEY", sub="Alpine Meadows & Nigeen Lake • 2,650m", coords="34.0837° N, 74.7973° E", sky1="#142733", sky2="#9fc2b9", mt="#20332a", style="lake" },
            new { name="hero-rajasthan", w=2400, h=1350, title="THE GREAT THAR", sub="Jaisalmer Golden Dunes & Citadels • 225m", coords="26.9157° N, 70.9083° E", sky1="#3d1e0c", sky2="#e09241", mt="#94521b", style="dunes" },
            new { name="hero-ladakh", w=2400, h=1350, title="LADAKH HIGHLANDS", sub="Pangong Tso & High Mountain Passes • 4,350m", coords="34.1526° N, 77.5771° E", sky1="#0b172b", sky2="#639ac9", mt="#1e2633", style="lake" },

            // DESTINATIONS (1200 x 1600)
            new { name="dest-spiti", w=1200, h=1600, title="Spiti Valley", sub="Himachal Pradesh", coords="32.24° N, 78.03° E", sky1="#161f2e", sky2="#c48b62", mt="#2b201a", style="mt" },
            new { name="dest-kashmir", w=1200, h=1600, title="Kashmir", sub="Western Himalaya", coords="34.08° N, 74.80° E", sky1="#162c38", sky2="#96bcb2", mt="#1e2e26", style="lake" },
            new { name="dest-manali", w=1200, h=1600, title="Manali & Lahaul", sub="Cedar Ridges", coords="32.24° N, 77.19° E", sky1="#172633", sky2="#739e7f", mt="#182b1d", style="mt" },
            new { name="dest-ladakh", w=1200, h=1600, title="Ladakh", sub="Moonland of High Passes", coords="34.15° N, 77.58° E", sky1="#0a1626", sky2="#5483ad", mt="#1a222e", style="lake" },
            new { name="dest-rajasthan", w=1200, h=1600, title="Rajasthan", sub="Thar Citadels", coords="26.92° N, 70.91° E", sky1="#381909", sky2="#cf8338", mt="#874716", style="dunes" },
            new { name="dest-kerala", w=1200, h=1600, title="Kerala", sub="Vembanad Backwaters", coords="9.49° N, 76.33° E", sky1="#0e2621", sky2="#6da183", mt="#143328", style="lake" },
            new { name="dest-goa", w=1200, h=1600, title="Goa Coast", sub="South Goa Coves", coords="15.29° N, 74.12° E", sky1="#241333", sky2="#db8e60", mt="#4d2719", style="lake" },

            // TRIPS (1200 x 900)
            new { name="trip-1", w=1200, h=900, title="Spiti Circuit Expedition", sub="8D/7N • High Mountain Passes", coords="Kaza • Chandratal", sky1="#141e2b", sky2="#cc9264", mt="#291e17", style="mt" },
            new { name="trip-2", w=1200, h=900, title="Kashmir Alpine Sanctuary", sub="6D/5N • Srinagar & Pahalgam", coords="Dal Lake • Lidder", sky1="#152936", sky2="#a1c4bb", mt="#203028", style="lake" },
            new { name="trip-3", w=1200, h=900, title="Manali & Lahaul Highlands", sub="5D/4N • Rohtang & Sissu", coords="Solang • Atal Tunnel", sky1="#162430", sky2="#7da689", mt="#19291f", style="mt" },
            new { name="trip-4", w=1200, h=900, title="Ladakh High-Pass Odyssey", sub="7D/6N • Pangong & Nubra", coords="Khardung La • Diskit", sky1="#0d192b", sky2="#6695be", mt="#1e2733", style="lake" },
            new { name="trip-5", w=1200, h=900, title="Royal Rajasthan Heritage", sub="6D/5N • Jaisalmer & Jodhpur", coords="Sam Dunes • Mehrangarh", sky1="#381909", sky2="#cf8338", mt="#874716", style="dunes" },
            new { name="trip-6", w=1200, h=900, title="Kerala Backwaters Retreat", sub="5D/4N • Alleppey & Kumarakom", coords="Vembanad • Houseboat", sky1="#0f2622", sky2="#71a386", mt="#15362a", style="lake" },
            new { name="trip-7", w=1200, h=900, title="Goa Coastal Slow Travel", sub="4D/3N • Cabo de Rama", coords="Palolem • Cola Beach", sky1="#241333", sky2="#db8e60", mt="#4d2719", style="lake" },
            new { name="trip-8", w=1200, h=900, title="Hampta Pass Trek", sub="5D/4N • High Alpine Crossing", coords="Chika • Balu Ka Ghera", sky1="#131e2b", sky2="#c48c62", mt="#261c16", style="mt" },

            // MOMENTS (720 x 1280)
            new { name="moment-1", w=720, h=1280, title="Open Roads, No Rush", sub="Spiti Valley • 4,270m", coords="Shared by Arundhati D.", sky1="#15212e", sky2="#d99962", mt="#2e2420", style="mt" },
            new { name="moment-2", w=720, h=1280, title="Above the Tree Line", sub="Lahaul • Himachal", coords="Shared by Rohan K.", sky1="#172633", sky2="#7da288", mt="#1a2e20", style="mt" },
            new { name="moment-3", w=720, h=1280, title="First Light, Together", sub="Ladakh • Nubra", coords="Shared by Devansh S.", sky1="#0b172b", sky2="#639ac9", mt="#1e2633", style="lake" },
            new { name="moment-4", w=720, h=1280, title="The Long Climb", sub="Hampta Pass • 4,270m", coords="Shared by Ishaan M.", sky1="#161f2e", sky2="#c48b62", mt="#2b201a", style="mt" },
            new { name="moment-5", w=720, h=1280, title="Morning on the Lake", sub="Srinagar • Kashmir", coords="Shared by Kabir & Rhea", sky1="#142733", sky2="#9fc2b9", mt="#20332a", style="lake" },
            new { name="moment-6", w=720, h=1280, title="Dunes at Dusk", sub="Jaisalmer • Rajasthan", coords="Shared by Meera N.", sky1="#3d1e0c", sky2="#e09241", mt="#94521b", style="dunes" },

            // TRAVELERS (600 x 600)
            new { name="traveler-1", w=600, h=600, title="Arundhati D.", sub="Spiti Valley Guest", coords="Bengaluru", sky1="#2b241e", sky2="#8c6d54", mt="#1f1813", style="portrait" },
            new { name="traveler-2", w=600, h=600, title="Kabir & Rhea", sub="Kashmir Meadows", coords="Mumbai", sky1="#1c2629", sky2="#617a78", mt="#121a1c", style="portrait" },
            new { name="traveler-3", w=600, h=600, title="Devansh S.", sub="Ladakh Circuit", coords="New Delhi", sky1="#1a212b", sky2="#5e7087", mt="#10151c", style="portrait" },
            new { name="traveler-4", w=600, h=600, title="Meera N.", sub="Thar Wilderness", coords="Hyderabad", sky1="#2e1d14", sky2="#875e47", mt="#1a110a", style="portrait" },

            // INSTAGRAM (800 x 800)
            new { name="insta-1", w=800, h=800, title="Trail Stories", sub="Himalayan Pass", coords="@trailstories.in", sky1="#151e2b", sky2="#c48a5e", mt="#2b1f18", style="mt" },
            new { name="insta-2", w=800, h=800, title="Morning Chai", sub="Key Monastery", coords="@trailstories.in", sky1="#261b14", sky2="#bd824f", mt="#2b1c11", style="dunes" },
            new { name="insta-3", w=800, h=800, title="Prayer Flags", sub="Khardung La 5359m", coords="@trailstories.in", sky1="#0d182b", sky2="#5485b0", mt="#1d2633", style="mt" },
            new { name="insta-4", w=800, h=800, title="Quiet Shallows", sub="Vembanad Waterway", coords="@trailstories.in", sky1="#102922", sky2="#699c7d", mt="#17362a", style="lake" },
            new { name="insta-5", w=800, h=800, title="Desert Forts", sub="Jaisalmer Bastions", coords="@trailstories.in", sky1="#361807", sky2="#cc7f31", mt="#7d3e0f", style="dunes" },
            new { name="insta-6", w=800, h=800, title="South Goa Gold", sub="Cola Lagoon", coords="@trailstories.in", sky1="#261233", sky2="#db8c5c", mt="#4d2417", style="lake" },
            new { name="insta-7", w=800, h=800, title="High Passes", sub="Chang La Ascent", coords="@trailstories.in", sky1="#14212e", sky2="#b5997d", mt="#26221d", style="mt" },
            new { name="insta-8", w=800, h=800, title="Campfire Tales", sub="Under the Milky Way", coords="@trailstories.in", sky1="#070c14", sky2="#252b3b", mt="#10121a", style="mt" },

            // OG DEFAULT (1200 x 630)
            new { name="og-default", w=1200, h=630, title="TRAIL STORIES", sub="Quiet Luxury & Slow Adventure in India", coords="@trailstories.in", sky1="#15212e", sky2="#d99962", mt="#2e2420", style="mt" }
        };

        Directory.CreateDirectory("public/images");
        Directory.CreateDirectory("public/images/real");

        ImageCodecInfo jpgCodec = null;
        foreach (var c in ImageCodecInfo.GetImageEncoders()) {
            if (c.FormatDescription == "JPEG") { jpgCodec = c; break; }
        }
        var encParams = new EncoderParameters(1);
        encParams.Param[0] = new EncoderParameter(Encoder.Quality, 85L);

        foreach (var it in items) {
            using (var bmp = new Bitmap(it.w, it.h))
            using (var g = Graphics.FromImage(bmp)) {
                g.SmoothingMode = SmoothingMode.AntiAlias;
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;

                Color c1 = ColorTranslator.FromHtml(it.sky1);
                Color c2 = ColorTranslator.FromHtml(it.sky2);
                Color cMt = ColorTranslator.FromHtml(it.mt);

                // Sky
                using (var brush = new LinearGradientBrush(new Rectangle(0, 0, it.w, it.h), c1, c2, LinearGradientMode.Vertical)) {
                    g.FillRectangle(brush, 0, 0, it.w, it.h);
                }

                // Landscape
                if (it.style == "mt") {
                    Point[] pts1 = {
                        new Point(0, (int)(it.h * 0.65)),
                        new Point((int)(it.w * 0.22), (int)(it.h * 0.44)),
                        new Point((int)(it.w * 0.45), (int)(it.h * 0.58)),
                        new Point((int)(it.w * 0.70), (int)(it.h * 0.38)),
                        new Point((int)(it.w * 0.88), (int)(it.h * 0.50)),
                        new Point(it.w, (int)(it.h * 0.40)),
                        new Point(it.w, it.h),
                        new Point(0, it.h)
                    };
                    using (var b1 = new SolidBrush(Color.FromArgb(180, cMt))) {
                        g.FillPolygon(b1, pts1);
                    }
                    Point[] pts2 = {
                        new Point(0, (int)(it.h * 0.72)),
                        new Point((int)(it.w * 0.32), (int)(it.h * 0.54)),
                        new Point((int)(it.w * 0.55), (int)(it.h * 0.66)),
                        new Point((int)(it.w * 0.82), (int)(it.h * 0.48)),
                        new Point(it.w, (int)(it.h * 0.62)),
                        new Point(it.w, it.h),
                        new Point(0, it.h)
                    };
                    using (var b2 = new SolidBrush(cMt)) {
                        g.FillPolygon(b2, pts2);
                    }
                } else if (it.style == "dunes") {
                    Point[] pts1 = {
                        new Point(0, (int)(it.h * 0.60)),
                        new Point((int)(it.w * 0.35), (int)(it.h * 0.52)),
                        new Point((int)(it.w * 0.70), (int)(it.h * 0.62)),
                        new Point(it.w, (int)(it.h * 0.48)),
                        new Point(it.w, it.h),
                        new Point(0, it.h)
                    };
                    using (var b1 = new SolidBrush(Color.FromArgb(190, cMt))) {
                        g.FillPolygon(b1, pts1);
                    }
                    Point[] pts2 = {
                        new Point(0, (int)(it.h * 0.75)),
                        new Point((int)(it.w * 0.45), (int)(it.h * 0.64)),
                        new Point((int)(it.w * 0.80), (int)(it.h * 0.72)),
                        new Point(it.w, (int)(it.h * 0.58)),
                        new Point(it.w, it.h),
                        new Point(0, it.h)
                    };
                    using (var b2 = new SolidBrush(cMt)) {
                        g.FillPolygon(b2, pts2);
                    }
                } else if (it.style == "lake") {
                    Point[] pts1 = {
                        new Point(0, (int)(it.h * 0.55)),
                        new Point((int)(it.w * 0.25), (int)(it.h * 0.38)),
                        new Point((int)(it.w * 0.55), (int)(it.h * 0.48)),
                        new Point((int)(it.w * 0.80), (int)(it.h * 0.34)),
                        new Point(it.w, (int)(it.h * 0.44)),
                        new Point(it.w, (int)(it.h * 0.65)),
                        new Point(0, (int)(it.h * 0.65))
                    };
                    using (var b1 = new SolidBrush(Color.FromArgb(170, cMt))) {
                        g.FillPolygon(b1, pts1);
                    }
                    using (var bWater = new SolidBrush(Color.FromArgb(200, c2))) {
                        g.FillRectangle(bWater, 0, (int)(it.h * 0.65), it.w, (int)(it.h * 0.35));
                    }
                    Point[] shore = {
                        new Point(0, (int)(it.h * 0.88)),
                        new Point((int)(it.w * 0.40), (int)(it.h * 0.82)),
                        new Point((int)(it.w * 0.75), (int)(it.h * 0.90)),
                        new Point(it.w, (int)(it.h * 0.84)),
                        new Point(it.w, it.h),
                        new Point(0, it.h)
                    };
                    using (var bShore = new SolidBrush(cMt)) {
                        g.FillPolygon(bShore, shore);
                    }
                } else {
                    int cx = it.w / 2;
                    int cy = (int)(it.h * 0.42);
                    int rad = (int)(it.w * 0.24);
                    using (var bBg = new SolidBrush(Color.FromArgb(239, 231, 218))) {
                        g.FillEllipse(bBg, cx - rad, cy - rad, rad * 2, rad * 2);
                    }
                    using (var bFig = new SolidBrush(cMt)) {
                        g.FillEllipse(bFig, (int)(cx - rad * 0.45), (int)(cy - rad * 0.6), (int)(rad * 0.9), (int)(rad * 0.9));
                        g.FillPie(bFig, (int)(cx - rad * 0.85), (int)(cy + rad * 0.1), (int)(rad * 1.7), (int)(rad * 1.3), 180, 180);
                    }
                }

                // Vignette gradient
                int vigH = (int)(it.h * 0.45);
                using (var bVig = new LinearGradientBrush(new Rectangle(0, it.h - vigH, it.w, vigH), Color.FromArgb(0, 0, 0, 0), Color.FromArgb(170, 0, 0, 0), LinearGradientMode.Vertical)) {
                    g.FillRectangle(bVig, 0, it.h - vigH, it.w, vigH);
                }

                // Brand Badge
                int brandSize = Math.Max(10, (int)(it.w * 0.012));
                using (var fBrand = new Font(FontFamily.GenericSansSerif, brandSize, FontStyle.Regular))
                using (var bGold = new SolidBrush(Color.FromArgb(230, 217, 203, 181))) {
                    g.DrawString("TRAIL STORIES • CURATED EXPEDITIONS", fBrand, bGold, (float)(it.w * 0.06), (float)(it.h * 0.06));
                }

                // Text
                int tSize = Math.Max(20, (int)(it.w * 0.038));
                int sSize = Math.Max(11, (int)(it.w * 0.015));
                using (var fTitle = new Font(FontFamily.GenericSerif, tSize, FontStyle.Bold))
                using (var fSub = new Font(FontFamily.GenericSansSerif, sSize, FontStyle.Regular))
                using (var bWhite = new SolidBrush(Color.FromArgb(245, 255, 255, 255)))
                using (var bGold = new SolidBrush(Color.FromArgb(220, 217, 203, 181))) {
                    float ty = (float)(it.h * 0.82);
                    if (it.style == "portrait") ty = (float)(it.h * 0.77);
                    g.DrawString(it.title, fTitle, bWhite, (float)(it.w * 0.06), ty);
                    g.DrawString(it.sub + "  |  " + it.coords, fSub, bGold, (float)(it.w * 0.06), ty + (float)(tSize * 1.35));
                }

                // Save as both .webp and .jpg to public/images AND public/images/real
                string[] exts = { ".webp", ".jpg" };
                foreach (var ext in exts) {
                    string f1 = "public/images/" + it.name + ext;
                    string f2 = "public/images/real/" + it.name + ext;
                    bmp.Save(f1, jpgCodec, encParams);
                    bmp.Save(f2, jpgCodec, encParams);
                }
                Console.WriteLine("Generated: " + it.name);
            }
        }
        Console.WriteLine("All 37 assets generated successfully!");
    }
}

