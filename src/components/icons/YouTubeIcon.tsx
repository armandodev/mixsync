export default function YouTubeIcon({
  width = 20,
  height = 20,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg viewBox="0 -7 48 48" fill="none" width={width} height={height}>
      <path
        d="m19.044 23.27-.002-13.582 12.97 6.814-12.968 6.768ZM47.52 7.334s-.47-3.33-1.908-4.798C43.786.61 41.74.601 40.803.49 34.086 0 24.011 0 24.011 0h-.022S13.914 0 7.197.49C6.258.6 4.214.61 2.387 2.535.948 4.003.48 7.334.48 7.334S0 11.247 0 15.158v3.668c0 3.912.48 7.823.48 7.823s.468 3.331 1.907 4.798c1.827 1.926 4.225 1.866 5.293 2.067C11.52 33.885 24 34 24 34s10.086-.015 16.803-.505c.938-.113 2.983-.122 4.809-2.048 1.438-1.467 1.908-4.798 1.908-4.798s.48-3.91.48-7.823v-3.668c0-3.911-.48-7.824-.48-7.824Z"
        fill="#CE1312"
        fill-rule="evenodd"
      />
    </svg>
  );
}
