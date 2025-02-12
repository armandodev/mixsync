export default function CopyIcon({
  width = 20,
  height = 20,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <g fill="#0F0F0F">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21 8a3 3 0 0 0-3-3h-8a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8Zm-2 0a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8Z"
        />
        <path d="M6 3h10a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v14a1 1 0 1 0 2 0V4a1 1 0 0 1 1-1Z" />
      </g>
    </svg>
  );
}
