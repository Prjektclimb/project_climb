
import dynamic from "next/dynamic";

const DynamicMap = dynamic(
  () => import("~/components/client/GymComponents/GymMap"),
  {
    ssr: false,
  },
);


const DynamicSideDrawer = dynamic(
  () => import("~/components/client/GymComponents/Sidedrawer"),
  { 
    ssr: false
  }
)

export default function GymsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col justify-evenly">
      <aside className="fixed z-10 h-full flex-none overflow-auto">
      <DynamicSideDrawer /> 
      </aside>

      <div className="flex flex-grow  items-center justify-center ">
        {children}
      </div>
      <div className=" mb-24 flex justify-center">
        <DynamicMap />
      </div>
    </div>
  );
}
