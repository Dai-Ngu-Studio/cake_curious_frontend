export default function StatusCard({ text, backgroundColor, dotColor }) {
  return (
    <div
      className={
        "flex items-center justify-center  p-2 rounded-md " + backgroundColor
      }
    >
      <div className={"mr-3 w-3 h-3 rounded-full bg-gr " + dotColor}></div>
      <div className="">{text}</div>
    </div>
  );
}
