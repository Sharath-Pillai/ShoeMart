/**
 * SkeletonRow — animated placeholder row for admin data tables.
 * Props:
 *   cols   — number of columns to render  (default 6)
 */
const SkeletonRow = ({ cols = 6 }) => (
  <tr className="animate-pulse">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 rounded bg-gray-200" style={{ width: `${60 + (i % 3) * 15}%` }} />
      </td>
    ))}
  </tr>
);

export default SkeletonRow;
