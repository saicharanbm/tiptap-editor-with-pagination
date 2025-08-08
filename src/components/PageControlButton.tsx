function PageControlButton({ children }: { children: React.ReactElement }) {
  return (
    <div className="p-2 rounded-full bg-[#E6DCEF] hover:bg-[#e3d2f1] cursor-pointer">
      {children}
    </div>
  );
}

export default PageControlButton;
