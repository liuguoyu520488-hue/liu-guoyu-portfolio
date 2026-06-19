import { useEffect, useRef, useState } from 'react';

const INTRO_EXIT_DURATION = 900;
const DIRECTORY_EXIT_DURATION = 560;

const contact = {
  phone: '13600109396',
  email: '3359866061@qq.com',
};

const stats = [
  { value: '10', label: '作品集页面整理' },
  { value: '5+', label: '项目方向覆盖' },
  { value: '8万+', label: '单篇内容曝光' },
  { value: '13.8%', label: '封面点击率记录' },
];

const strengths = [
  {
    title: 'AI 设计工作流',
    text: '能把主题、受众、信息层级和浏览路径转译成提示词、页面结构与可落地原型。',
  },
  {
    title: '品牌与内容表达',
    text: '擅长把项目定位、视觉语气和内容节奏统一起来，让画面服务品牌信息而不是停留在装饰。',
  },
  {
    title: '图文编辑与排版',
    text: '能够独立完成选题、资料整理、文案、图片筛选和长图文排版，关注移动端阅读体验。',
  },
  {
    title: '短视频策划',
    text: '从主题、脚本到镜头节奏拆解观点，并完成拍摄、剪辑、调色和画面包装。',
  },
  {
    title: '数据复盘意识',
    text: '会结合曝光、点击率、播放量和互动反馈，反推封面、标题与内容节奏优化方向。',
  },
  {
    title: '跨工具协作',
    text: '熟悉 ChatGPT、Codex、Figma、HTML/CSS、即梦、Midjourney、剪映、PR、PS 等工具组合。',
  },
];

const tools = [
  'ChatGPT',
  'Codex',
  'Figma',
  'HTML / CSS',
  '即梦',
  'Midjourney',
  '可灵',
  '剪映',
  'PR',
  'PS',
  '小红书',
  '表格',
];

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const projects = {
  'ai-web': {
    eyebrow: 'AI PROJECT 01',
    title: 'AI 网页设计',
    type: 'AIGC / Web Prototype',
    image: '/portfolio-pages/page-03.webp',
    summary:
      '用 AI 辅助完成网页创意、页面结构、视觉风格和前端原型，把内容想法整理成可浏览的页面。',
    roles: ['需求拆解', '提示词设计', '页面结构', '视觉迭代', '原型整理'],
    tools: ['ChatGPT', 'Codex', 'Figma', 'HTML', 'CSS', '即梦', 'Gemini'],
    process: [
      '明确网页主题、目标受众、核心信息和用户浏览路径。',
      '用 AI 产出页面文案、视觉方向、模块结构和首屏表达。',
      '删除空泛表达，保留与主题、岗位和阅读习惯匹配的内容。',
      '整理成网页原型或 HTML 页面，统一标题层级、配色和图片位置。',
      '检查电脑端和移动端效果，修正文字溢出、布局拥挤和图片比例问题。',
    ],
    result: '形成可浏览的网页原型，并沉淀出从提示词到页面结构再到前端落地的 AI 设计工作流。',
  },
  'ai-storyboard': {
    eyebrow: 'AI PROJECT 02',
    title: 'AI 漫剧与分镜提示词创作',
    type: 'AIGC / Storyboard',
    image: '/portfolio-pages/page-04.webp',
    summary:
      '把故事创意拆成画面、镜头和提示词，用于 AI 漫剧、广告短片或短视频前期策划。',
    roles: ['故事构思', '人物设定', '分镜拆解', '画面提示词', '镜头节奏设计'],
    tools: ['ChatGPT', '即梦', 'Midjourney', '可灵', '剪映', 'PR'],
    process: [
      '明确故事主题、人物关系、冲突来源和情绪走向。',
      '将故事整理成开头、冲突、转折、结尾，保证短剧情有完整节奏。',
      '为每个镜头写出景别、人物动作、画面风格、光线和镜头语言。',
      '把分镜转换成可执行提示词，用于文生图或图生视频。',
      '根据生成结果继续调整人物一致性、画面节奏和镜头衔接。',
    ],
    result: '让分镜提示词能够直接服务于角色一致性、镜头语言和画面风格控制。',
  },
  'social-media': {
    eyebrow: 'PROJECT 01',
    title: '横道｜广州约拍账号运营',
    type: 'Social Media Operation',
    image: '/portfolio-pages/page-06.webp',
    summary:
      '围绕广州约拍场景搭建垂类小红书账号，通过图文与视频内容展示拍摄风格、约拍场景和服务信息。',
    roles: ['账号定位', '选题', '发布', '数据复盘'],
    tools: ['小红书', '剪映', 'PR', 'PS', '表格'],
    process: [
      '先明确垂类方向和目标用户，再围绕客片展示、约拍避坑、风格推荐等方向建立选题。',
      '用图文与短视频呈现拍摄风格、服务信息和城市约拍场景。',
      '发布后结合曝光、点击率、播放量和互动情况，调整封面、标题和内容节奏。',
    ],
    metrics: [
      { value: '26', label: '篇图文视频' },
      { value: '11888', label: '近 30 日曝光' },
      { value: '13.8%', label: '封面点击率' },
      { value: '8万+', label: '单篇曝光' },
    ],
    result: '把约拍服务内容做成可持续更新的账号，并通过数据复盘优化内容表达。',
  },
  editorial: {
    eyebrow: 'PROJECT 02',
    title: '微信公众号图文创作',
    type: 'Editorial / Layout',
    image: '/portfolio-pages/page-07.webp',
    summary:
      '围绕城市文化与生活方式选题，完成从主题规划、资料整理到文案、图片和排版的完整图文生产。',
    roles: ['选题规划', '文案', '图片整理', '排版设计'],
    tools: ['微信公众号编辑器', 'PS', '资料整理', '图文排版'],
    process: [
      '从城市饮食、街巷生活和地方记忆切入，确定推文主题与阅读角度。',
      '搭建标题、导语、段落层级和图片节奏，再补充正文细节。',
      '统一色调、图片比例和段落留白，让长图文更适合手机端阅读。',
    ],
    metrics: [
      { value: '15', label: '篇城市文化类推文' },
      { value: '3万+', label: '字原创图文内容累计产出' },
      { value: '独立', label: '完成文案、图片与排版设计' },
    ],
    result: '完成城市文化宣传专题的图文生产，形成从选题到排版的完整内容能力。',
  },
  'video-production': {
    eyebrow: 'PROJECT 03',
    title: '诚信筑影·青春定格',
    type: 'Short Video Planning',
    image: '/portfolio-pages/page-09.webp',
    summary:
      '校级微视频比赛作品，围绕校园诚信、迎评促建和“强国有我”等主题进行短视频创作。',
    roles: ['拍摄', '剪辑', '创意策划', '视觉包装'],
    tools: ['PR', 'PS', '拍摄', '剪辑', '调色'],
    process: [
      '以梦境为切入点设计剧情，用轻松幽默的方式呈现校园诚信议题。',
      '完成拍摄、剪辑、调色和画面包装，保证成片节奏和主题表达统一。',
      '在有限素材条件下强化故事结构，让观点更容易被看完和记住。',
    ],
    metrics: [{ value: '校级二等奖', label: '项目结果' }],
    result: '作品获得校级二等奖，体现短视频脚本策划、镜头组织和视觉包装能力。',
  },
};

const directoryItems = [
  { id: 'home', label: 'HOME' },
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'ai-web', label: 'AI WEB' },
  { id: 'ai-storyboard', label: 'AI STORYBOARD' },
  { id: 'social-media', label: 'SOCIAL MEDIA' },
  { id: 'editorial', label: 'EDITORIAL' },
  { id: 'video-production', label: 'VIDEO PRODUCTION' },
  { id: 'about', label: 'ABOUT' },
];

const directoryOffsets = ['0vw', '3vw', '0.7vw', '4vw', '1.6vw', '5vw', '2.2vw', '3.4vw', '0.4vw'];

const jobDirections = [
  '新媒体运营',
  '内容策划',
  '图文编辑',
  '短视频策划',
  'AI 创作',
  '网页设计',
  '剪辑与拍摄',
];

const resumeHref = publicAsset('/assets/liu-guoyu-resume.pdf');

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function mixRgb(from, to, amount) {
  const ratio = clamp(amount, 0, 1);
  return from.map((value, index) => Math.round(lerp(value, to[index], ratio))).join(' ');
}

function GlassSignatureLine({ nameRef }) {
  const svgRef = useRef(null);
  const gradientRef = useRef(null);
  const midStopRef = useRef(null);
  const highlightStopRef = useRef(null);
  const glowPathRef = useRef(null);
  const bodyPathRef = useRef(null);
  const highlightPathRef = useRef(null);

  useEffect(() => {
    const snakeConfig = {
      segmentCount: 22,
      minActiveSegments: 7,
      maxActiveSegments: 21,
      followFactor: 0.135,
      bodyFollowFactor: 0.25,
      minSpacing: 9,
      maxSpacing: 18,
      idleWave: 1.6,
      activeWave: 18,
      waveFrequency: 0.0048,
      wavePhase: 0.78,
      pointerOffset: 20,
    };
    const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const origin = { x: window.innerWidth * 0.68, y: window.innerHeight * 0.52 };
    const segments = Array.from({ length: snakeConfig.segmentCount }, (_, index) => ({
      x: origin.x - index * snakeConfig.minSpacing,
      y: origin.y + Math.sin(index * 0.7) * 5,
    }));
    const motion = {
      mode: isCoarsePointer ? 'orbit' : 'follow',
      target: { ...origin },
      previousHead: { ...origin },
      previousPointer: { ...origin },
      eventTime: performance.now(),
      lastMove: performance.now(),
      pointerSpeed: 0,
      displaySpeed: 0,
      gradientAngle: 0,
      visible: 0.42,
    };
    let frameId = 0;

    const getNameRect = () => {
      const rect = nameRef.current?.getBoundingClientRect();

      if (rect?.width && rect?.height) return rect;

      return {
        left: window.innerWidth * 0.32,
        top: window.innerHeight * 0.42,
        width: window.innerWidth * 0.36,
        height: window.innerHeight * 0.16,
      };
    };

    const isInsideName = (x, y) => {
      const rect = getNameRect();
      return x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height;
    };

    const pointOnOrbit = (time) => {
      const rect = getNameRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const radiusX = rect.width / 2 + clamp(window.innerWidth * 0.05, 44, 78);
      const radiusY = rect.height / 2 + clamp(window.innerHeight * 0.058, 28, 52);
      const angle = time * 0.00082 + Math.sin(time * 0.00042) * 0.22;
      const organicWobble = 1 + Math.sin(time * 0.00115) * 0.045;

      return {
        x: centerX + Math.cos(angle) * radiusX * organicWobble,
        y: centerY + Math.sin(angle) * radiusY * (1 + Math.cos(time * 0.001) * 0.04),
      };
    };

    const updateGradient = (dx, dy, speedRatio) => {
      const angle = Math.atan2(dy || 0.01, dx || 0.01) * (180 / Math.PI);
      const midOffset = 36 + speedRatio * 12;
      const highlightOffset = 56 + speedRatio * 18;
      const highlightOpacity = 0.32 + speedRatio * 0.48;

      motion.gradientAngle = lerp(motion.gradientAngle, angle, 0.12);
      gradientRef.current?.setAttribute('gradientTransform', `rotate(${motion.gradientAngle.toFixed(1)} 0.5 0.5)`);
      midStopRef.current?.setAttribute('offset', `${midOffset.toFixed(1)}%`);
      highlightStopRef.current?.setAttribute('offset', `${highlightOffset.toFixed(1)}%`);
      svgRef.current?.style.setProperty('--landing-ribbon-highlight-opacity', String(clamp(highlightOpacity, 0.32, 0.82)));
    };

    const updateSnakeBody = (time, target, speedRatio) => {
      const head = segments[0];
      head.x = lerp(head.x, target.x, snakeConfig.followFactor);
      head.y = lerp(head.y, target.y, snakeConfig.followFactor);

      const headDx = head.x - motion.previousHead.x;
      const headDy = head.y - motion.previousHead.y;
      const spacing = lerp(snakeConfig.minSpacing, snakeConfig.maxSpacing, speedRatio);

      for (let index = 1; index < segments.length; index += 1) {
        const previous = segments[index - 1];
        const current = segments[index];
        const dx = current.x - previous.x;
        const dy = current.y - previous.y;
        const distance = Math.hypot(dx, dy) || 1;
        const targetX = previous.x + (dx / distance) * spacing;
        const targetY = previous.y + (dy / distance) * spacing;
        const localFollow = snakeConfig.bodyFollowFactor - index * 0.0035;

        current.x = lerp(current.x, targetX, clamp(localFollow, 0.14, snakeConfig.bodyFollowFactor));
        current.y = lerp(current.y, targetY, clamp(localFollow, 0.14, snakeConfig.bodyFollowFactor));
      }

      const activeSegments = Math.round(
        lerp(snakeConfig.minActiveSegments, snakeConfig.maxActiveSegments, speedRatio),
      );
      const waveAmplitude = lerp(snakeConfig.idleWave, snakeConfig.activeWave, speedRatio);

      const shaped = segments.slice(0, activeSegments).map((point, index, activePoints) => {
        const next = activePoints[index - 1] || point;
        const previous = activePoints[index + 1] || point;
        const tangentX = next.x - previous.x || headDx || 1;
        const tangentY = next.y - previous.y || headDy || 0;
        const tangentLength = Math.hypot(tangentX, tangentY) || 1;
        const normalX = -tangentY / tangentLength;
        const normalY = tangentX / tangentLength;
        const tailFade = 1 - index / Math.max(activeSegments - 1, 1);
        const wave = Math.sin(time * snakeConfig.waveFrequency + index * snakeConfig.wavePhase) * waveAmplitude;

        return {
          x: point.x + normalX * wave * tailFade,
          y: point.y + normalY * wave * tailFade,
        };
      });

      motion.previousHead.x = head.x;
      motion.previousHead.y = head.y;

      return {
        points: shaped.reverse(),
        headDx,
        headDy,
      };
    };

    const pointsToPath = (points) => {
      if (points.length < 2) return '';

      const commands = [`M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`];

      for (let index = 0; index < points.length - 1; index += 1) {
        const p0 = points[index - 1] || points[index];
        const p1 = points[index];
        const p2 = points[index + 1];
        const p3 = points[index + 2] || p2;
        const c1 = {
          x: p1.x + (p2.x - p0.x) / 6,
          y: p1.y + (p2.y - p0.y) / 6,
        };
        const c2 = {
          x: p2.x - (p3.x - p1.x) / 6,
          y: p2.y - (p3.y - p1.y) / 6,
        };

        commands.push(
          `C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`,
        );
      }

      return commands.join(' ');
    };

    const setGlassPath = (path, opacity) => {
      [glowPathRef.current, bodyPathRef.current, highlightPathRef.current].forEach((node) => {
        node?.setAttribute('d', path);
      });
      if (svgRef.current) {
        svgRef.current.style.opacity = String(opacity);
      }
    };

    const handlePointerMove = (event) => {
      if (isCoarsePointer) return;

      const now = performance.now();
      const dx = event.clientX - motion.previousPointer.x;
      const dy = event.clientY - motion.previousPointer.y;
      const frameScale = 16.67 / Math.max(now - motion.eventTime, 8);
      const pointerSpeed = Math.hypot(dx, dy) * frameScale;
      const angle = Math.atan2(dy || 0.01, dx || 0.01);

      motion.mode = isInsideName(event.clientX, event.clientY) ? 'orbit' : 'follow';
      motion.target.x = event.clientX + Math.cos(angle) * snakeConfig.pointerOffset;
      motion.target.y = event.clientY + Math.sin(angle) * snakeConfig.pointerOffset;
      motion.pointerSpeed = clamp(pointerSpeed, 0, 78);
      motion.previousPointer.x = event.clientX;
      motion.previousPointer.y = event.clientY;
      motion.eventTime = now;
      motion.lastMove = now;
    };

    const handleTouchMove = (event) => {
      const touch = event.touches?.[0];
      if (!touch) return;

      const now = performance.now();
      const dx = touch.clientX - motion.previousPointer.x;
      const dy = touch.clientY - motion.previousPointer.y;
      const frameScale = 16.67 / Math.max(now - motion.eventTime, 8);
      const pointerSpeed = Math.hypot(dx, dy) * frameScale;

      motion.mode = 'follow';
      motion.target.x = touch.clientX + 14;
      motion.target.y = touch.clientY + 12;
      motion.pointerSpeed = clamp(pointerSpeed, 0, 64);
      motion.previousPointer.x = touch.clientX;
      motion.previousPointer.y = touch.clientY;
      motion.eventTime = now;
      motion.lastMove = now;
    };

    const animate = (time) => {
      const idleTime = time - motion.lastMove;
      const isOrbitingName = motion.mode === 'orbit' || (isCoarsePointer && idleTime > 900);
      const targetSpeed = idleTime > 120 ? 0 : motion.pointerSpeed;
      motion.displaySpeed = lerp(motion.displaySpeed, targetSpeed, idleTime > 120 ? 0.035 : 0.16);
      const movementRatio = clamp(motion.displaySpeed / 46, 0, 1);
      const speedRatio = isOrbitingName ? Math.max(movementRatio, 0.42) : movementRatio;
      const target = isOrbitingName ? pointOnOrbit(time) : motion.target;
      const snake = updateSnakeBody(time, target, speedRatio);
      const path = pointsToPath(snake.points);
      const opacityTarget = isOrbitingName || idleTime < 1800 ? 0.72 : 0.4;

      updateGradient(snake.headDx, snake.headDy, speedRatio);
      motion.visible = lerp(motion.visible, opacityTarget, 0.08);
      setGlassPath(path, motion.visible);
      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.cancelAnimationFrame(frameId);
    };
  }, [nameRef]);

  return (
    <svg className="glass-signature" ref={svgRef} aria-hidden="true">
      <defs>
        <linearGradient id="glassRibbonStroke" ref={gradientRef} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(6, 59, 142, 0)" />
          <stop offset="14%" stopColor="rgba(6, 59, 142, 0.42)" />
          <stop ref={midStopRef} offset="40%" stopColor="rgba(22, 121, 211, 0.72)" />
          <stop ref={highlightStopRef} offset="62%" stopColor="rgba(145, 221, 255, 0.82)" />
          <stop offset="100%" stopColor="rgba(99, 200, 255, 0)" />
        </linearGradient>
        <linearGradient id="glassRibbonHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(10, 78, 174, 0)" />
          <stop offset="44%" stopColor="rgba(99, 200, 255, 0.52)" />
          <stop offset="58%" stopColor="rgba(255, 255, 255, 0.7)" />
          <stop offset="100%" stopColor="rgba(47, 151, 229, 0)" />
        </linearGradient>
        <filter id="glassRibbonSoftBlur" x="-20%" y="-80%" width="140%" height="260%">
          <feGaussianBlur stdDeviation="4.4" />
        </filter>
      </defs>
      <path className="glass-line-glow" ref={glowPathRef} />
      <path className="glass-line-body" ref={bodyPathRef} />
      <path className="glass-line-highlight" ref={highlightPathRef} />
    </svg>
  );
}

function LandingIntro({ isExiting, onEnter }) {
  const nameRef = useRef(null);
  const markRef = useRef(null);

  useEffect(() => {
    const mark = markRef.current;
    if (!mark) return undefined;

    const motion = {
      position: 46,
      targetPosition: 46,
      darkness: 0,
      targetDarkness: 0,
      reflection: 0,
      targetReflection: 0,
      lastMove: 0,
      previous: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    };
    let frameId = 0;

    const handlePointerMove = (event) => {
      const dx = event.clientX - motion.previous.x;
      const dy = event.clientY - motion.previous.y;
      const speed = Math.hypot(dx, dy);
      const rect = nameRef.current?.getBoundingClientRect();
      const relativeX = rect?.width ? ((event.clientX - rect.left) / rect.width) * 100 : 50;

      motion.targetPosition = clamp(relativeX, 12, 88);
      motion.targetDarkness = clamp(speed / 88, 0, 1);
      motion.targetReflection = clamp(speed / 160, 0, 0.42);
      motion.previous.x = event.clientX;
      motion.previous.y = event.clientY;
      motion.lastMove = performance.now();
    };

    const handleTouchMove = (event) => {
      const touch = event.touches?.[0];
      if (!touch) return;

      handlePointerMove({
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
    };

    const animate = (time) => {
      const idle = time - motion.lastMove;
      const isIdle = idle > 170;

      motion.targetDarkness = isIdle ? 0 : motion.targetDarkness;
      motion.targetReflection = isIdle ? 0 : motion.targetReflection;
      motion.position = lerp(motion.position, isIdle ? 50 : motion.targetPosition, 0.075);
      motion.darkness = lerp(motion.darkness, motion.targetDarkness, 0.08);
      motion.reflection = lerp(motion.reflection, motion.targetReflection, 0.075);

      mark.style.setProperty('--name-gradient-position', `${motion.position.toFixed(1)}%`);
      mark.style.setProperty('--name-darkness', motion.darkness.toFixed(3));
      mark.style.setProperty('--name-reflection-opacity', motion.reflection.toFixed(3));

      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
      onEnter();
    }
  };

  return (
    <section
      className={`landing-intro${isExiting ? ' is-exiting' : ''}`}
      role="button"
      tabIndex={0}
      aria-label="进入刘国煜个人作品集"
      onClick={onEnter}
      onKeyDown={handleKeyDown}
    >
      <GlassSignatureLine nameRef={nameRef} />
      <div className="landing-mark" ref={markRef} aria-hidden="true">
        <h1 ref={nameRef}>刘国煜</h1>
      </div>
    </section>
  );
}

function DirectoryGlassLine({ scrollerRef, hoveredItemRef }) {
  const svgRef = useRef(null);
  const gradientRef = useRef(null);
  const midStopRef = useRef(null);
  const highlightStopRef = useRef(null);
  const glowPathRef = useRef(null);
  const bodyPathRef = useRef(null);
  const highlightPathRef = useRef(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const snakeConfig = {
      segmentCount: 18,
      minActiveSegments: 6,
      maxActiveSegments: 17,
      followFactor: 0.13,
      bodyFollowFactor: 0.24,
      minSpacing: 10,
      maxSpacing: 18,
      idleWave: 1.4,
      activeWave: 14,
      waveFrequency: 0.0052,
      wavePhase: 0.78,
    };
    const motion = {
      current: { x: window.innerWidth * 0.22, y: window.innerHeight * 0.55 },
      target: { x: window.innerWidth * 0.22, y: window.innerHeight * 0.55 },
      previous: { x: window.innerWidth * 0.22, y: window.innerHeight * 0.55 },
      speed: 0,
      angle: 0,
      lastMove: 0,
      visible: isCoarsePointer ? 0.42 : 0,
    };
    const segments = Array.from({ length: snakeConfig.segmentCount }, (_, index) => ({
      x: motion.current.x - index * snakeConfig.minSpacing,
      y: motion.current.y + Math.sin(index * 0.7) * 4,
    }));
    let frameId = 0;

    const setPath = (path) => {
      [glowPathRef.current, bodyPathRef.current, highlightPathRef.current].forEach((node) => {
        node?.setAttribute('d', path);
      });
    };

    const updateGradient = (dx, dy, speed, isHovering) => {
      const intensity = clamp(speed / 42, 0, 1);
      const angle = Math.atan2(dy || 0.01, dx || 0.01) * (180 / Math.PI);
      const midOffset = 38 + intensity * 13;
      const highlightOffset = 58 + intensity * 18;
      const highlightOpacity = (isHovering ? 0.74 : 0.42) + intensity * 0.26;

      motion.angle = lerp(motion.angle, angle, 0.14);
      gradientRef.current?.setAttribute('gradientTransform', `rotate(${motion.angle.toFixed(1)} 0.5 0.5)`);
      midStopRef.current?.setAttribute('offset', `${midOffset.toFixed(1)}%`);
      highlightStopRef.current?.setAttribute('offset', `${highlightOffset.toFixed(1)}%`);
      svgRef.current?.style.setProperty('--directory-highlight-opacity', String(clamp(highlightOpacity, 0.38, 0.92)));
    };

    const pointsToPath = (points) => {
      if (points.length < 2) return '';

      const commands = [`M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`];
      for (let index = 0; index < points.length - 1; index += 1) {
        const p0 = points[index - 1] || points[index];
        const p1 = points[index];
        const p2 = points[index + 1];
        const p3 = points[index + 2] || p2;
        const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
        const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };

        commands.push(
          `C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`,
        );
      }

      return commands.join(' ');
    };

    const buildFollowPath = (time, boost = 0) => {
      motion.current.x = lerp(motion.current.x, motion.target.x, 0.12);
      motion.current.y = lerp(motion.current.y, motion.target.y, 0.12);

      const dx = motion.current.x - motion.previous.x;
      const dy = motion.current.y - motion.previous.y;
      const distance = Math.hypot(dx, dy);
      motion.speed = lerp(motion.speed, Math.max(distance, boost), 0.24);
      segments[0].x = motion.current.x;
      segments[0].y = motion.current.y;

      const speedRatio = clamp(motion.speed / 36, 0, 1);
      const spacing = lerp(snakeConfig.minSpacing, snakeConfig.maxSpacing, speedRatio);

      for (let index = 1; index < segments.length; index += 1) {
        const previous = segments[index - 1];
        const current = segments[index];
        const segmentDx = current.x - previous.x;
        const segmentDy = current.y - previous.y;
        const segmentDistance = Math.hypot(segmentDx, segmentDy) || 1;
        const targetX = previous.x + (segmentDx / segmentDistance) * spacing;
        const targetY = previous.y + (segmentDy / segmentDistance) * spacing;
        const localFollow = clamp(snakeConfig.bodyFollowFactor - index * 0.004, 0.13, snakeConfig.bodyFollowFactor);

        current.x = lerp(current.x, targetX, localFollow);
        current.y = lerp(current.y, targetY, localFollow);
      }

      const idle = time - motion.lastMove;
      motion.visible = lerp(motion.visible, idle > 1300 ? 0.18 : 0.72, 0.09);
      motion.previous.x = motion.current.x;
      motion.previous.y = motion.current.y;

      const activeSegments = Math.round(lerp(snakeConfig.minActiveSegments, snakeConfig.maxActiveSegments, speedRatio));
      const waveAmplitude = lerp(snakeConfig.idleWave, snakeConfig.activeWave, speedRatio);
      const shaped = segments.slice(0, activeSegments).map((point, index, activePoints) => {
        const next = activePoints[index - 1] || point;
        const previous = activePoints[index + 1] || point;
        const tangentX = next.x - previous.x || dx || 1;
        const tangentY = next.y - previous.y || dy || 0;
        const tangentLength = Math.hypot(tangentX, tangentY) || 1;
        const normalX = -tangentY / tangentLength;
        const normalY = tangentX / tangentLength;
        const tailFade = 1 - index / Math.max(activeSegments - 1, 1);
        const wave = Math.sin(time * snakeConfig.waveFrequency + index * snakeConfig.wavePhase) * waveAmplitude;

        return {
          x: point.x + normalX * wave * tailFade,
          y: point.y + normalY * wave * tailFade,
        };
      });

      updateGradient(dx, dy, motion.speed, false);
      return pointsToPath(shaped.reverse());
    };

    const buildHoverPath = (time) => {
      const label = hoveredItemRef.current?.querySelector('.directory-label');
      const rect = label?.getBoundingClientRect();

      if (!rect?.width || !rect?.height) return null;

      const margin = clamp(rect.width * 0.04, 18, 58);
      const startX = clamp(rect.left + margin, 34, window.innerWidth - 90);
      const endX = clamp(rect.right + clamp(rect.width * 0.035, 22, 70), startX + 120, window.innerWidth - 42);
      const y = clamp(rect.bottom + clamp(window.innerHeight * 0.026, 18, 34), 58, window.innerHeight - 42);
      const lift = clamp(rect.height * 0.18, 22, 48);
      const hook = clamp(rect.height * 0.1, 16, 34);
      const dx = endX - startX;

      motion.current.x = lerp(motion.current.x, endX, 0.1);
      motion.current.y = lerp(motion.current.y, y, 0.1);
      motion.target.x = endX;
      motion.target.y = y;
      motion.speed = lerp(motion.speed, 14, 0.08);
      motion.visible = lerp(motion.visible, 0.88, 0.12);

      updateGradient(dx, -lift, 24, true);
      return buildFollowPath(time, 16);
    };

    const handlePointerMove = (event) => {
      if (isCoarsePointer) return;

      motion.target.x = event.clientX + 22;
      motion.target.y = event.clientY + 16;
      motion.lastMove = performance.now();
    };

    const handleTouch = (event) => {
      const touch = event.touches?.[0];
      if (!touch) return;

      motion.target.x = touch.clientX + 16;
      motion.target.y = touch.clientY + 14;
      motion.lastMove = performance.now();
      motion.visible = 0.56;
    };

    const animate = (time) => {
      const hoverPath = !isCoarsePointer ? buildHoverPath(time) : null;
      const recentTouch = isCoarsePointer && time - motion.lastMove < 1100;
      const path =
        hoverPath ||
        (isCoarsePointer && !recentTouch
          ? `M ${(window.innerWidth * 0.18).toFixed(1)} ${(window.innerHeight * 0.58).toFixed(1)} C ${(window.innerWidth * 0.36).toFixed(1)} ${(window.innerHeight * 0.54).toFixed(1)}, ${(window.innerWidth * 0.58).toFixed(1)} ${(window.innerHeight * 0.62).toFixed(1)}, ${(window.innerWidth * 0.78).toFixed(1)} ${(window.innerHeight * 0.56).toFixed(1)}`
          : buildFollowPath(time));

      setPath(path);
      if (svgRef.current) {
        svgRef.current.style.opacity = String(motion.visible);
      }

      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    scrollerRef.current?.addEventListener('touchmove', handleTouch, { passive: true });
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      scrollerRef.current?.removeEventListener('touchmove', handleTouch);
      window.cancelAnimationFrame(frameId);
    };
  }, [hoveredItemRef, scrollerRef]);

  return (
    <svg className="directory-glass-line" ref={svgRef} aria-hidden="true">
      <defs>
        <linearGradient id="directoryBlueGlassStroke" ref={gradientRef} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(6, 59, 142, 0)" />
          <stop offset="16%" stopColor="rgba(6, 59, 142, 0.58)" />
          <stop ref={midStopRef} offset="44%" stopColor="rgba(22, 121, 211, 0.82)" />
          <stop ref={highlightStopRef} offset="68%" stopColor="rgba(145, 221, 255, 0.92)" />
          <stop offset="100%" stopColor="rgba(99, 200, 255, 0)" />
        </linearGradient>
        <linearGradient id="directoryBlueGlassHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(10, 78, 174, 0)" />
          <stop offset="42%" stopColor="rgba(99, 200, 255, 0.58)" />
          <stop offset="58%" stopColor="rgba(255, 255, 255, 0.78)" />
          <stop offset="100%" stopColor="rgba(47, 151, 229, 0)" />
        </linearGradient>
        <filter id="directoryBlueGlassBlur" x="-18%" y="-90%" width="136%" height="280%">
          <feGaussianBlur stdDeviation="4.2" />
        </filter>
      </defs>
      <path className="directory-glass-glow" ref={glowPathRef} />
      <path className="directory-glass-body" ref={bodyPathRef} />
      <path className="directory-glass-highlight" ref={highlightPathRef} />
    </svg>
  );
}

function DirectoryPage({ isLeaving, selectedId, restoreScrollTop, onSelect }) {
  const scrollerRef = useRef(null);
  const listRef = useRef(null);
  const spacerRef = useRef(null);
  const itemRefs = useRef([]);
  const hoveredItemRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const AUTO_SCROLL_ENABLED = true;
    const AUTO_SCROLL_EDGE_RATIO = 0.22;
    const AUTO_SCROLL_MAX_SPEED = 16;
    const AUTO_SCROLL_MIN_SPEED = 0.55;
    const AUTO_SCROLL_EASE = 0.08;
    const isAutoScrollEnabled =
      AUTO_SCROLL_ENABLED && !window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const SMOOTH_SCROLL_EASE = isAutoScrollEnabled ? 0.095 : 1;
    const ITEM_LERP = 0.13;
    const DIRECTORY_MOUSE_FLOAT = 0.16;
    const DIRECTORY_SCROLL_INERTIA = 0.82;
    const DIRECTORY_FLOAT_MAX = 14;
    const list = listRef.current;
    const spacer = spacerRef.current;
    const itemState = new WeakMap();
    let frameId = 0;
    const gray = [168, 165, 161];
    const ink = [17, 17, 17];
    const motion = {
      mouseY: scroller.clientHeight / 2,
      targetMouseY: scroller.clientHeight / 2,
      lastMouseY: scroller.clientHeight / 2,
      mouseVelocityY: 0,
      lastMouseMove: 0,
      isPointerInside: false,
      autoScrollSpeed: 0,
      currentScroll: restoreScrollTop,
      previousScrollTop: restoreScrollTop,
      scrollVelocity: 0,
    };

    const syncScrollSpace = () => {
      if (!list || !spacer) return;

      const contentHeight = list.scrollHeight;
      spacer.style.height = `${Math.max(contentHeight, scroller.clientHeight + 1)}px`;
    };

    const getAutoScrollTarget = () => {
      if (!isAutoScrollEnabled || !motion.isPointerInside) return 0;

      const viewportHeight = scroller.clientHeight;
      const edgeSize = viewportHeight * AUTO_SCROLL_EDGE_RATIO;

      if (motion.mouseY < edgeSize) {
        const pressure = 1 - motion.mouseY / edgeSize;
        const speed = AUTO_SCROLL_MIN_SPEED + pressure * (AUTO_SCROLL_MAX_SPEED - AUTO_SCROLL_MIN_SPEED);
        return -speed;
      }

      if (motion.mouseY > viewportHeight - edgeSize) {
        const pressure = (motion.mouseY - (viewportHeight - edgeSize)) / edgeSize;
        return AUTO_SCROLL_MIN_SPEED + pressure * (AUTO_SCROLL_MAX_SPEED - AUTO_SCROLL_MIN_SPEED);
      }

      return 0;
    };

    const updateItemMotion = () => {
      const targetAutoScrollSpeed = getAutoScrollTarget();
      motion.autoScrollSpeed = lerp(motion.autoScrollSpeed, targetAutoScrollSpeed, AUTO_SCROLL_EASE);

      if (Math.abs(motion.autoScrollSpeed) > 0.02) {
        scroller.scrollTop += motion.autoScrollSpeed;
      } else {
        motion.autoScrollSpeed = 0;
      }

      const targetScroll = scroller.scrollTop;
      motion.currentScroll = lerp(motion.currentScroll, targetScroll, SMOOTH_SCROLL_EASE);
      if (list) {
        list.style.setProperty('--directory-visual-scroll', `${motion.currentScroll.toFixed(2)}px`);
      }

      const viewportCenter = scroller.getBoundingClientRect().top + scroller.clientHeight / 2;
      const centerRange = scroller.clientHeight / 2;
      const mouseActive = performance.now() - motion.lastMouseMove < 1200;
      const scrollDelta = targetScroll - motion.previousScrollTop;

      motion.scrollVelocity = lerp(motion.scrollVelocity, scrollDelta, 0.16);
      motion.previousScrollTop = targetScroll;
      motion.mouseY = lerp(motion.mouseY, motion.targetMouseY, 0.14);
      motion.mouseVelocityY = lerp(motion.mouseVelocityY, motion.mouseY - motion.lastMouseY, 0.18);
      motion.lastMouseY = motion.mouseY;

      itemRefs.current.forEach((item) => {
        if (!item) return;

        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const centerProgress = clamp(1 - Math.abs(viewportCenter - itemCenter) / centerRange, 0, 1);
        const mouseDistance = Math.abs(itemCenter - motion.mouseY);
        const mouseProgress = mouseActive ? clamp(1 - mouseDistance / (scroller.clientHeight * 0.34), 0, 1) : 0;
        const clarity = clamp(Math.max(centerProgress, mouseProgress * 0.78), 0, 1);
        const hoverTarget = hoveredItemRef.current === item ? 1 : 0;
        const state =
          itemState.get(item) ||
          {
            hover: 0,
            opacity: 0.22,
            scale: 0.98,
            blur: 0.8,
            floatY: 0,
            wakeX: 0,
            color: 0,
            letter: 0,
          };
        const targetOpacity = clamp(0.22 + centerProgress * 0.68 + mouseProgress * 0.2 + hoverTarget * 0.18, 0.22, 1);
        const targetScale = clamp(0.975 + centerProgress * 0.025 + mouseProgress * 0.012 + hoverTarget * 0.025, 0.975, 1.04);
        const targetBlur = clamp((1 - clarity) * 0.95, 0, 0.95);
        const targetFloatY = clamp(
          mouseProgress * motion.mouseVelocityY * DIRECTORY_MOUSE_FLOAT -
            motion.scrollVelocity * DIRECTORY_SCROLL_INERTIA,
          -DIRECTORY_FLOAT_MAX,
          DIRECTORY_FLOAT_MAX,
        );
        const targetWakeX = clamp(mouseProgress * 5 + hoverTarget * 11, 0, 12);
        const targetColor = clamp(centerProgress * 0.62 + mouseProgress * 0.34 + hoverTarget * 0.48, 0, 0.94);
        const targetLetter = hoverTarget * 0.022;

        state.hover = lerp(state.hover, hoverTarget, ITEM_LERP);
        state.opacity = lerp(state.opacity, targetOpacity, ITEM_LERP);
        state.scale = lerp(state.scale, targetScale, ITEM_LERP);
        state.blur = lerp(state.blur, targetBlur, ITEM_LERP);
        state.floatY = lerp(state.floatY, targetFloatY, ITEM_LERP);
        state.wakeX = lerp(state.wakeX, targetWakeX, ITEM_LERP);
        state.color = lerp(state.color, targetColor, ITEM_LERP);
        state.letter = lerp(state.letter, targetLetter, ITEM_LERP);
        itemState.set(item, state);

        item.style.setProperty('--item-opacity', state.opacity.toFixed(3));
        item.style.setProperty('--item-scale', state.scale.toFixed(3));
        item.style.setProperty('--item-blur', `${state.blur.toFixed(2)}px`);
        item.style.setProperty('--item-float-y', `${state.floatY.toFixed(1)}px`);
        item.style.setProperty('--item-wake-x', `${state.wakeX.toFixed(1)}px`);
        item.style.setProperty('--item-letter-shift', `${state.letter.toFixed(4)}em`);
        item.style.setProperty('--focus-ink', mixRgb(gray, ink, state.color));
        item.classList.toggle('is-near-center', clarity > 0.58);
      });

      frameId = window.requestAnimationFrame(updateItemMotion);
    };

    const handlePointerMove = (event) => {
      motion.targetMouseY = event.clientY;
      motion.isPointerInside = true;
      motion.lastMouseMove = performance.now();
    };

    const handlePointerLeave = () => {
      motion.isPointerInside = false;
    };

    const handleWheel = (event) => {
      if (!isAutoScrollEnabled) return;

      event.preventDefault();
      scroller.scrollTop += event.deltaY;
    };

    const handleResize = () => {
      syncScrollSpace();
    };

    scroller.scrollTop = restoreScrollTop;
    motion.currentScroll = restoreScrollTop;
    motion.previousScrollTop = restoreScrollTop;
    syncScrollSpace();
    scroller.addEventListener('pointermove', handlePointerMove, { passive: true });
    scroller.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    scroller.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize);
    frameId = window.requestAnimationFrame(updateItemMotion);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      scroller.removeEventListener('pointermove', handlePointerMove);
      scroller.removeEventListener('pointerleave', handlePointerLeave);
      scroller.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
    };
  }, [restoreScrollTop]);

  const handleSelect = (itemId) => {
    onSelect(itemId, scrollerRef.current?.scrollTop ?? 0);
  };

  return (
    <nav
      className={`directory-page${isLeaving ? ' is-leaving' : ''}`}
      aria-label="Portfolio index"
      ref={scrollerRef}
    >
      <DirectoryGlassLine scrollerRef={scrollerRef} hoveredItemRef={hoveredItemRef} />
      <div className="directory-list" ref={listRef}>
        {directoryItems.map((item, index) => (
          <button
            className={`directory-item${selectedId === item.id ? ' is-selected' : ''}`}
            type="button"
            key={item.id}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            onPointerEnter={(event) => {
              hoveredItemRef.current = event.currentTarget;
            }}
            onPointerLeave={() => {
              hoveredItemRef.current = null;
            }}
            onFocus={(event) => {
              hoveredItemRef.current = event.currentTarget;
            }}
            onBlur={() => {
              hoveredItemRef.current = null;
            }}
            onClick={() => handleSelect(item.id)}
          >
            <span className="directory-label">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="directory-scroll-space" ref={spacerRef} aria-hidden="true" />
    </nav>
  );
}

function DetailShell({ section, children, onBack }) {
  return (
    <main className="detail-page">
      <button className="back-button" type="button" onClick={onBack}>
        INDEX
      </button>
      <section className="detail-shell" aria-labelledby={`${section}-title`}>
        {children}
      </section>
    </main>
  );
}

function ChipList({ items }) {
  return (
    <div className="chip-list">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function MetricGrid({ items }) {
  return (
    <div className="metric-grid">
      {items.map((item) => (
        <div className="metric-card" key={`${item.value}-${item.label}`}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function OverviewDetail({ onBack }) {
  return (
    <DetailShell section="overview" onBack={onBack}>
      <div className="profile-detail-grid">
        <div className="profile-copy">
          <p className="detail-kicker">OVERVIEW</p>
          <h1 id="overview-title">视觉设计师 / AI 设计师 / 品牌设计师</h1>
          <p>
            我以视觉设计为底层语言，把 AI 创作、品牌表达、内容策划和可浏览原型连接成完整的设计生产流程。
          </p>
          <p>
            当前作品集覆盖 AI 网页原型、AI 漫剧分镜提示词、新媒体账号运营、公众号图文创作和短视频策划。核心能力集中在视觉表达、内容结构和 AI 辅助设计落地。
          </p>
          <ChipList items={jobDirections} />
          <MetricGrid items={stats} />
        </div>
        <figure className="portrait-frame detail-portrait">
          <img src={publicAsset('/assets/portrait.webp')} alt="刘国煜人物照片" />
        </figure>
      </div>
    </DetailShell>
  );
}

function SkillsDetail({ onBack }) {
  return (
    <DetailShell section="skills" onBack={onBack}>
      <div className="detail-heading">
        <p className="detail-kicker">SKILLS</p>
        <h1 id="skills-title">职业技能、工具和能力结构</h1>
        <p>
          能从主题定位、内容结构、视觉执行到数据复盘完成连续工作，也能把 AI 工具纳入设计和内容生产流程。
        </p>
      </div>
      <div className="strength-grid detail-strength-grid">
        {strengths.map((item, index) => (
          <article className="strength-card" key={item.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="tool-panel">
        <h2>工具栈</h2>
        <ChipList items={tools} />
      </div>
    </DetailShell>
  );
}

function ProjectDetail({ id, onBack }) {
  const project = projects[id];

  return (
    <DetailShell section={id} onBack={onBack}>
      <article className="project-detail">
        <div className="detail-heading">
          <p className="detail-kicker">{project.eyebrow}</p>
          <h1 id={`${id}-title`}>{project.title}</h1>
          <p>{project.summary}</p>
        </div>

        <div className="project-detail-grid">
          <figure className="project-detail-image">
            <img src={publicAsset(project.image)} alt={`${project.title}作品图`} />
          </figure>
          <div className="project-detail-side">
            <div>
              <h2>我的职责</h2>
              <ChipList items={project.roles} />
            </div>
            <div>
              <h2>使用工具</h2>
              <ChipList items={project.tools} />
            </div>
            {project.metrics ? <MetricGrid items={project.metrics} /> : null}
          </div>
        </div>

        <div className="process-section">
          <h2>过程</h2>
          <ol>
            {project.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="result-panel">
          <span>RESULT</span>
          <p>{project.result}</p>
        </div>
      </article>
    </DetailShell>
  );
}

function AboutDetail({ onBack }) {
  return (
    <DetailShell section="about" onBack={onBack}>
      <div className="about-contact-page">
        <div className="profile-copy about-contact-copy">
          <p className="detail-kicker">ABOUT</p>
          <h1 id="about-title">联系与求职方向</h1>
          <p>期待新媒体运营、内容策划、图文编辑、短视频策划、AI 创作、网页、剪辑、拍摄相关机会。</p>
          <p>我能把内容想法整理成清晰的视觉方案，也能把数据反馈转化为下一轮内容优化方向。</p>
        </div>
        <div className="about-contact-grid">
          <a className="about-contact-link" href={`mailto:${contact.email}`}>
            <span>Email</span>
            <strong>{contact.email}</strong>
          </a>
          <a className="about-contact-link" href={`tel:${contact.phone}`}>
            <span>Phone</span>
            <strong>{contact.phone}</strong>
          </a>
          <a className="about-contact-link" href={resumeHref} download>
            <span>Resume</span>
            <strong>下载简历 PDF</strong>
          </a>
        </div>
        <div className="tool-panel about-direction-panel">
          <h2>求职方向</h2>
          <ChipList items={jobDirections} />
        </div>
      </div>
    </DetailShell>
  );
}

function DetailPage({ activeSection, onBack }) {
  if (activeSection === 'overview') return <OverviewDetail onBack={onBack} />;
  if (activeSection === 'skills') return <SkillsDetail onBack={onBack} />;
  if (activeSection === 'about') return <AboutDetail onBack={onBack} />;

  return <ProjectDetail id={activeSection} onBack={onBack} />;
}

function PortfolioPage({ isActive, onReturnHome }) {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedDirectoryId, setSelectedDirectoryId] = useState(null);
  const [isDirectoryLeaving, setIsDirectoryLeaving] = useState(false);
  const [restoreDirectoryScrollTop, setRestoreDirectoryScrollTop] = useState(0);

  const openSection = (sectionId, directoryScrollTop = 0) => {
    if (isDirectoryLeaving) return;

    setRestoreDirectoryScrollTop(directoryScrollTop);
    setSelectedDirectoryId(sectionId);
    setIsDirectoryLeaving(true);
    window.setTimeout(() => {
      if (sectionId === 'home') {
        setActiveSection(null);
        setIsDirectoryLeaving(false);
        setSelectedDirectoryId(null);
        onReturnHome();
        return;
      }

      setActiveSection(sectionId);
      setIsDirectoryLeaving(false);
      setSelectedDirectoryId(null);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, DIRECTORY_EXIT_DURATION);
  };

  const returnToDirectory = () => {
    setActiveSection(null);
  };

  return (
    <div
      className={`portfolio-page${isActive ? ' is-active' : ''}`}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      {activeSection ? (
        <DetailPage activeSection={activeSection} onBack={returnToDirectory} />
      ) : (
        <DirectoryPage
          isLeaving={isDirectoryLeaving}
          selectedId={selectedDirectoryId}
          restoreScrollTop={restoreDirectoryScrollTop}
          onSelect={openSection}
        />
      )}
    </div>
  );
}

export default function App() {
  const [introState, setIntroState] = useState('landing');
  const isPortfolioActive = introState !== 'landing';
  const isIntroExiting = introState === 'exiting';

  const enterPortfolio = () => {
    if (introState !== 'landing') return;

    setIntroState('exiting');
    window.setTimeout(() => {
      setIntroState('entered');
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, INTRO_EXIT_DURATION);
  };

  const returnHome = () => {
    setIntroState('landing');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <>
      {introState !== 'entered' && (
        <LandingIntro isExiting={isIntroExiting} onEnter={enterPortfolio} />
      )}
      <PortfolioPage isActive={isPortfolioActive} onReturnHome={returnHome} />
    </>
  );
}
