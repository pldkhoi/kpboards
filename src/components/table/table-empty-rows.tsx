// ----------------------------------------------------------------------

type Props = {
  height?: number;
  emptyRows: number;
};

export default function TableEmptyRows({ emptyRows, height }: Props) {
  if (!emptyRows) {
    return null;
  }

  return (
    <tr style={height ? { height: height * emptyRows } : undefined}>
      <td colSpan={9} />
    </tr>
  );
}
