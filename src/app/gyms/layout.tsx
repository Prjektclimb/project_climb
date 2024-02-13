
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
    <div className="flex flex-col pr-4 pl-2">
      <div className="flex flex-grow  items-center justify-center ">
        {children}
      </div>
      <div className="flex lg:flex-row sm:flex-col">
      <aside className=" lg:h-24 lg:mb-20 self-start  z-50 w-auto bg-white">
      <DynamicSideDrawer /> 
      </aside>
      <div className="lg:w-3/4 md:w-full sm:w-full">
        <DynamicMap />
      </div>
      </div>
    </div>
  );
}
