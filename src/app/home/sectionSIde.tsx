export default function SideSection() {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <img
                alt="House"
                src="https://plus.unsplash.com/premium_photo-1688678097506-6c12a0376238?auto=format&fit=crop&q=80&w=1998&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="relative flex items-center bg-gray-100">
            <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"></span>

            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tempore, debitis.
              </h2>

              <p className="mt-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquid, molestiae! Quidem est esse numquam odio deleniti,
                beatae, magni dolores provident quaerat totam eos, aperiam
                architecto eius quis quibusdam fugiat dicta.
              </p>

              <a
                href="#"
                className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
