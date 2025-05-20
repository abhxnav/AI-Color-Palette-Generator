const ColorPalette = ({
  colorPalette,
}: {
  colorPalette: ColorPalette | null
}) => {
  return (
    <div className="size-full border-2 rounded-xl flex items-center justify-center border-border">
      {JSON.stringify(colorPalette)}
    </div>
  )
}

export default ColorPalette
