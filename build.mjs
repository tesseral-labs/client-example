import * as esbuild from "esbuild";
import { configDotenv } from "dotenv";

const BUILD_IS_DEV = process.env.BUILD_IS_DEV === "1";

if (BUILD_IS_DEV) {
  configDotenv({
    path: "./.env",
  });
}

const context = await esbuild.context({
  bundle: true,
  define: {
    __REPLACED_BY_ESBUILD_TESSERAL_PUBLISHABLE_KEY__: JSON.stringify(
      process.env.TESSERAL_PUBLISHABLE_KEY
    ),
  },
  entryPoints: ["./src"],
  minify: !BUILD_IS_DEV,
  outfile: "./public/index.js",
  sourcemap: true,
  target: ["chrome58", "firefox57", "safari11", "edge18"],
});

if (BUILD_IS_DEV) {
  console.log("watching");
  await context.watch();
} else {
  await context.rebuild();
  await context.dispose();
}
