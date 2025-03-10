export default function AppLogo({
  width = 40,
  height = 40,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" width={width} height={height}>
      <path
        d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16Z"
        fill="#473333"
      />
      <path
        d="M16 23.273a7.273 7.273 0 1 0 0-14.546 7.273 7.273 0 0 0 0 14.546Z"
        fill="#EE4F07"
      />
      <path
        d="M16 18.91a2.909 2.909 0 1 0 0-5.819 2.909 2.909 0 0 0 0 5.818Z"
        fill="#fff"
      />
    </svg>
  );
}
