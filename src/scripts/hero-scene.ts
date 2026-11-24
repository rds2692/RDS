import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';

const canvas = document.querySelector<HTMLCanvasElement>('[data-hero-scene]');
const hero = canvas?.closest<HTMLElement>('.hero-section');

const renderStaticFallback = () => {
  hero?.classList.add('webgl-unavailable');
};

if (!canvas || !hero) {
  renderStaticFallback();
} else {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointer = new Vector2();
  const targetPointer = new Vector2();
  let scrollProgress = 0;
  let visible = true;
  let frame = 0;

  try {
    const scene = new Scene();
    const camera = new PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.z = 10;

    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1.25 : 1.75));
    renderer.outputColorSpace = SRGBColorSpace;

    const lime = new Color('#d8ff61');
    const coral = new Color('#e94a36');
    const lilac = new Color('#c8bde8');
    const group = new Group();
    scene.add(group);

    const ringMaterial = (color: Color, opacity: number) => new MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
    });

    const ringOne = new Mesh(new TorusGeometry(4.15, 0.014, 10, 180), ringMaterial(lime, 0.56));
    ringOne.rotation.set(1.18, 0.15, -0.12);
    group.add(ringOne);

    const ringTwo = new Mesh(new TorusGeometry(3.1, 0.012, 10, 150), ringMaterial(coral, 0.7));
    ringTwo.rotation.set(0.75, 0.62, 0.4);
    group.add(ringTwo);

    const ringThree = new Mesh(new TorusGeometry(5.15, 0.008, 8, 210), ringMaterial(lilac, 0.28));
    ringThree.rotation.set(1.45, -0.42, 0.16);
    group.add(ringThree);

    const pointCount = window.innerWidth < 760 ? 210 : 420;
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);
    for (let index = 0; index < pointCount; index += 1) {
      const radius = 2.5 + Math.random() * 5.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const index3 = index * 3;
      pointPositions[index3] = radius * Math.sin(phi) * Math.cos(theta);
      pointPositions[index3 + 1] = radius * Math.cos(phi) * 0.72;
      pointPositions[index3 + 2] = radius * Math.sin(phi) * Math.sin(theta) * 0.72;
      const color = index % 8 === 0 ? coral : index % 5 === 0 ? lilac : lime;
      pointColors[index3] = color.r;
      pointColors[index3 + 1] = color.g;
      pointColors[index3 + 2] = color.b;
    }
    const pointGeometry = new BufferGeometry();
    pointGeometry.setAttribute('position', new Float32BufferAttribute(pointPositions, 3));
    pointGeometry.setAttribute('color', new Float32BufferAttribute(pointColors, 3));
    const points = new Points(pointGeometry, new PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
    }));
    group.add(points);

    const dummy = new Object3D();
    const shardGeometry = new IcosahedronGeometry(0.09, 0);
    const shardCount = window.innerWidth < 760 ? 30 : 44;
    const limeShardCount = Math.ceil(shardCount * 0.61);
    const coralShardCount = shardCount - limeShardCount;
    const limeShards = new InstancedMesh(
      shardGeometry,
      new MeshBasicMaterial({ color: lime, transparent: true, opacity: 0.72 }),
      limeShardCount,
    );
    const coralShards = new InstancedMesh(
      shardGeometry,
      new MeshBasicMaterial({ color: coral, transparent: true, opacity: 0.78 }),
      coralShardCount,
    );
    const shardData = Array.from({ length: shardCount }, (_, index) => {
      const angle = (index / shardCount) * Math.PI * 2 + Math.random() * 0.8;
      const radius = 2.35 + Math.random() * 4.4;
      return {
        position: new Vector3(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 4.5,
          Math.sin(angle) * radius * 0.68,
        ),
        scale: 0.45 + Math.random() * 1.8,
        speed: 0.35 + Math.random() * 0.8,
      };
    });

    const updateShardMatrices = (time: number) => {
      let limeIndex = 0;
      let coralIndex = 0;
      shardData.forEach((shard, index) => {
        dummy.position.copy(shard.position);
        dummy.position.y += Math.sin(time * shard.speed + index) * 0.16;
        dummy.rotation.set(time * shard.speed * 0.35, time * shard.speed * 0.2, index * 0.7);
        dummy.scale.setScalar(shard.scale);
        dummy.updateMatrix();
        if (index < limeShardCount) {
          limeShards.setMatrixAt(limeIndex, dummy.matrix);
          limeIndex += 1;
        } else {
          coralShards.setMatrixAt(coralIndex, dummy.matrix);
          coralIndex += 1;
        }
      });
      limeShards.instanceMatrix.needsUpdate = true;
      coralShards.instanceMatrix.needsUpdate = true;
    };
    updateShardMatrices(0);
    group.add(limeShards, coralShards);

    const resize = () => {
      const { width, height } = hero.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (reduceMotion) renderer.render(scene, camera);
    };

    const render = (timeMs = 0) => {
      const time = timeMs * 0.001;
      pointer.lerp(targetPointer, 0.045);
      group.rotation.y = Math.sin(time * 0.14) * 0.12 + pointer.x * 0.18;
      group.rotation.x = pointer.y * 0.11;
      group.rotation.z = Math.sin(time * 0.07) * 0.025;
      ringOne.rotation.z = -0.12 + time * 0.025;
      ringTwo.rotation.z = 0.4 - time * 0.035;
      ringThree.rotation.z = 0.16 + time * 0.012;
      points.rotation.y = time * 0.008;
      points.rotation.x = Math.sin(time * 0.1) * 0.04;
      updateShardMatrices(time);
      camera.position.x += (pointer.x * 0.48 - camera.position.x) * 0.035;
      camera.position.y += (-pointer.y * 0.3 - camera.position.y) * 0.035;
      camera.position.z = 10 + scrollProgress * 0.8;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const loop = (timeMs: number) => {
      render(timeMs);
      if (!visible || document.hidden) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (reduceMotion || frame || !visible || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduceMotion) render();
    else startLoop();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(hero);

    const updateScroll = () => {
      scrollProgress = Math.min(window.scrollY / Math.max(hero.offsetHeight, 1), 1);
    };
    updateScroll();

    const onPointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      targetPointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      targetPointer.y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    };
    const resetPointer = () => targetPointer.set(0, 0);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) startLoop();
      else stop();
    }, { threshold: 0.05 });
    visibilityObserver.observe(hero);

    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', resetPointer, { passive: true });
    window.addEventListener('scroll', updateScroll, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else startLoop();
    });

    window.addEventListener('pagehide', () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      renderer.dispose();
      group.traverse((object) => {
        if (!(object instanceof Mesh || object instanceof Points || object instanceof InstancedMesh)) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material.dispose();
      });
    }, { once: true });
  } catch {
    renderStaticFallback();
  }
}
