function init() {
  // module aliases
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composites = Matter.Composites,
    Composite = Matter.Composite;

  // create an engine
  var engine = Engine.create();
  world = engine.world;

  // create a renderer
  var render = Render.create({
    element: document.getElementById("cart-container"),
    engine: engine,
    options: {
      width: 834,
      height: 421,
      showAngleIndicator: false,
      wireframes: false,
      background: "transparent",
    },
  });

  // create two boxes and a ground
  var boxA = Bodies.circle(400, 200, 60, {
    render: {
      sprite: {
        texture: "/images/img-praxis.svg",
      },
    },
  });
  var boxB = Bodies.circle(450, 50, 54, {
    render: {
      sprite: {
        texture: "/images/img-presta.svg",
      },
    },
  });
  var boxC = Bodies.circle(400, 200, 42, {
    render: {
      sprite: {
        texture: "/images/img-zencart.svg",
      },
    },
  });
  var boxD = Bodies.circle(450, 50, 70, {
    render: {
      sprite: {
        texture: "/images/img-woocommerce.svg",
      },
    },
  });
  var boxE = Bodies.circle(400, 200, 51, {
    render: {
      sprite: {
        texture: "/images/img-opencart.svg",
      },
    },
  });
  var boxF = Bodies.circle(450, 50, 52, {
    render: {
      sprite: {
        texture: "/images/img-100.svg",
      },
    },
  });
  var boxG = Bodies.circle(450, 50, 70, {
    render: {
      sprite: {
        texture: "/images/img-magento.svg",
      },
    },
  });
  var boxH = Bodies.circle(450, 50, 70, {
    render: {
      sprite: {
        texture: "/images/img-bigcommerce.svg",
      },
    },
  });
  var boxI = Bodies.circle(450, 50, 70, {
    render: {
      sprite: {
        texture: "/images/img-shopify.svg",
      },
    },
  });
  var boxJ = Bodies.circle(400, 50, 34, {
    render: {
      sprite: {
        texture: "/images/img-km.svg",
      },
    },
  });

  var wallL = Bodies.rectangle(70, 200, 10, 450, {
    isStatic: true,
    render: {
      fillStyle: "#EBEBEB",
      // fillStyle: '#14cc2d',
    },
    angle: Math.PI * 0.9,
  });
  var wallR = Bodies.rectangle(770, 200, 10, 450, {
    isStatic: true,
    render: {
      fillStyle: "#EBEBEB",
      // fillStyle: '#14cc2d',
    },
    angle: Math.PI * 0.09,
  });
  var ground = Bodies.trapezoid(421, 415, 576, 10, -0.01, {
    isStatic: true,
    chamfer: { radius: [5, 0, 0, 5] },
    render: {
      fillStyle: "#EBEBEB",
      lineWidth: 0,
      // strokeStyle: '#14cc2d',
    },
  });
  var roof = Bodies.rectangle(420, 0, 820, 20, {
    isStatic: true,
    render: {
      fillStyle: "#EBEBEB",
      lineWidth: 0,
      // strokeStyle: '#14cc2d',
    },
    // chamfer: { radius: [10, 0, 0, 0] },
  });

  // add all of the bodies to the world
  Composite.add(world, [
    boxA,
    boxB,
    boxC,
    boxD,
    boxE,
    boxF,
    boxG,
    boxH,
    boxI,
    boxJ,
  ]);
  // Composite.add(world, [roof, wallL, wallR, ground,]);
  Composite.add(world, [roof, wallL, wallR, ground]);

  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

  Composite.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;
  // run the renderer
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
}

window.addEventListener("load", init);
