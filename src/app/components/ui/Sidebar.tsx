import FilterBySources from "../layout/FilterBySources";

const Sidebar = () => {
  return (
    <section className="w-full h-full py-10">
      <div className="p-5 flex flex-col space-y-10 h-full">
        <h2 className="font-medium text-3xl text-black">News Aggregator</h2>
        <FilterBySources />
      </div>
    </section>
  );
};

export default Sidebar;