import PageControlButton from "./PageControlButtons";

function CharacterCount() {
  return (
    <PageControlButton direction="left">
      <div className="flex items-center gap-1.5">
        <p className="">900</p>
        <p className="text-[#7A797B] text-sm">characters</p>
      </div>
    </PageControlButton>
  );
}

export default CharacterCount;
