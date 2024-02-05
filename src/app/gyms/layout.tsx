
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
      <aside className="lg:h-full w-auto lg:mb-20 fixed z-50">
      <DynamicSideDrawer /> 
      </aside>
      <div className="flex flex-grow  items-center justify-center ">
        {children}
      </div>
      <div className="lg:w-3/4 md:w-full lg:self-end">
        <DynamicMap />
      </div>
    </div>
  );
}
