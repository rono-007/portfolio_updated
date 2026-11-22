<template>
  <section id="works" class="common-padding mb-20">
    <div class="flex flex-col">
      <h3
        id="selectedWorks"
        v-html="selectedWorks"
        class="heading-1 text-start leading-none font-bold uppercase"
      ></h3>
      <p
        class="heading-1 text-flax-smoke-400 text-opacity-50 hidden w-4/5 text-end font-extrabold sm:block"
      >
        ( {{ selectedWorksProps.length }} )
      </p>

      <div
        id="selected-works-text"
        class="md:column-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
      >
        <p
          class="heading-6 text-flax-smoke-300/85 col-span-4 text-center text-nowrap lg:col-start-2"
        >
          (
          <span class="inline sm:hidden">{{ selectedWorksProps.length }} </span>
          PROJECTS )
        </p>
        <p
          class="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold lg:col-span-7"
        >
          Featured projects spanning artificial intelligence, machine learning,
          generative AI, and full-stack engineering.
        </p>
      </div>
    </div>

    <div
      class="sm:column-gap relative mt-12 grid size-full grid-cols-12 lg:mt-[10%]"
    >
      <div
        class="text-flax-smoke-100 sticky top-12 col-span-5 hidden h-fit w-full overflow-hidden text-[22vw] leading-[0.8] font-semibold md:flex"
      >
        <span class="font-title! relative -tracking-wider">0</span>
        <span
          id="index"
          class="font-title! relative -tracking-wider will-change-transform"
          >{{ index + 1 }}.</span
        >
      </div>
      <aside
        @mouseenter="showCursor"
        @mouseleave="hideCursor"
        class="relative col-span-full flex flex-col space-y-12 md:col-span-7"
      >
        <div
          v-for="(work, i) in selectedWorksProps"
          :key="i"
          class="work-card @container"
        >
          <div class="group">
            <a
              target="_blank"
              rel="noopener noreferrer"
              :href="work.url"
              class="block"
            >
              <div
                class="flex-center relative aspect-square overflow-clip rounded-lg"
              >
                <img
                  alt="work-background"
                  loading="lazy"
                  class="absolute size-full object-cover select-none"
                  :src="work.imageBg"
                />
                <div
                  class="flex-center z-10 aspect-4/3 size-full overflow-clip rounded-lg object-cover"
                >
                  <video
                    ref="videoRefs"
                    :src="work.videoSrc"
                    muted
                    :autoplay="false"
                    type="video/webm"
                    class="size-[80%] rounded-md object-contain blur transition-all duration-500 ease-in-out"
                  ></video>
                </div>
              </div>
            </a>

            <div class="mt-4">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <p class="heading-6 font-title! text-flax-smoke-300 font-semibold tracking-wide">
                  {{ work.category }}
                </p>
                <div v-if="work.links" class="flex items-center gap-2">
                  <a
                    v-if="work.links.live"
                    :href="work.links.live"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="border-flax-smoke-400 hover:bg-flax-smoke-200 hover:text-black rounded-full border px-3 py-1 text-xs uppercase font-medium transition-colors"
                  >
                    Live Demo ↗
                  </a>
                  <a
                    v-if="work.links.github"
                    :href="work.links.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="border-flax-smoke-400 hover:bg-flax-smoke-200 hover:text-black rounded-full border px-3 py-1 text-xs uppercase font-medium transition-colors"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>

              <div class="items-center justify-between sm:flex">
                <a
                  :href="work.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="heading-3 font-title! font-bold uppercase hover:text-flax-smoke-400 transition-colors"
                >
                  {{ work.name }}
                </a>
                <div class="flex flex-wrap gap-1.5 select-none mt-2 sm:mt-0">
                  <p
                    class="border-flax-smoke-300 hover:bg-flax-smoke-300 hover:text-flax-smoke-900 rounded-full border px-3 py-1 text-xs md:text-sm md:px-4 md:py-2 transition-[background-color,color] duration-500 ease-in-out"
                    v-for="tag in work.tags"
                    :key="tag"
                  >
                    <span>{{ tag }}</span>
                  </p>
                  <p
                    class="border-flax-smoke-300 bg-flax-smoke-300 text-flax-smoke-900 hover:text-flax-smoke-300 rounded-full border px-3 py-1 text-xs md:text-sm md:px-4 md:py-2 transition-[background-color,color] duration-500 ease-in-out hover:bg-transparent"
                  >
                    <span>{{ work.year }}</span>
                  </p>
                </div>
              </div>

              <p
                v-if="work.description"
                class="heading-6 font-fancy text-flax-smoke-300/85 mt-3 max-w-[65ch] leading-relaxed"
              >
                {{ work.description }}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { animateSplitText } from '@/animations';
  import { textSplitterIntoChar } from '@/functions';
  import { computed, onBeforeMount, onMounted, ref, useTemplateRef } from 'vue';
  import gsap from 'gsap';
  import { useWindowSize } from '@vueuse/core';
  import { work1, work2, work3, work4, work5 } from '@/assets/videos';
  import { workBg1, workBg2, workBg3, workBg4, workBg5 } from '@/assets/images';
  const videoRefs = useTemplateRef<HTMLVideoElement[]>('videoRefs');

  const isSmallScreen = computed(() => {
    return useWindowSize().width.value < 768;
  });
  const index = ref(0);
  const selectedWorks = ref('Selected Projects /');

  const tl = gsap
    .timeline({ defaults: { duration: 0.25 } })
    .to(['#cursor', '#inner'], {
      scale: 1,
      opacity: 1,
    })
    .paused(true);

  const showCursor = () => {
    tl.play();
  };
  const hideCursor = () => {
    tl.reverse();
  };

  const selectedWorksProps = [
    {
      name: 'Akkhor',
      category: 'Bengali Typography Foundry & Digital Platform',
      description:
        'A Bengali typography platform for discovering fonts, exploring glyphs and viewing typography specimens.',
      tags: ['Typography', 'Foundry', 'Glyph Explorer'],
      videoSrc: work3,
      imageBg: workBg3,
      url: 'https://github.com/rono-007',
      year: '2025',
      links: {
        github: 'https://github.com/rono-007',
      },
    },
    {
      name: 'Stock-Wise',
      category: 'ML-Powered Inventory Optimization',
      description:
        'Machine learning-based demand forecasting and inventory recommendations using LightGBM and XGBoost.',
      tags: ['Machine Learning', 'LightGBM', 'XGBoost'],
      videoSrc: work1,
      imageBg: workBg1,
      url: 'https://github.com/rono-007',
      year: '2024',
      links: {
        github: 'https://github.com/rono-007',
      },
    },
    {
      name: 'CareerFlow',
      category: 'AI-Powered Career Management Platform',
      description:
        'Resume analysis, ATS scoring, candidate ranking and career-management workflows.',
      tags: ['AI', 'ATS Scoring', 'Candidate Ranking'],
      videoSrc: work5,
      imageBg: workBg5,
      url: 'https://github.com/rono-007',
      year: '2024',
      links: {
        github: 'https://github.com/rono-007',
      },
    },
    {
      name: 'eDNA Biodiversity Analysis',
      category: 'AI-Based Biodiversity Research',
      description:
        'Environmental DNA processing, sequence analysis and unsupervised clustering for biodiversity assessment.',
      tags: ['Bioinformatics', 'Sequence Analysis', 'Clustering'],
      videoSrc: work2,
      imageBg: workBg2,
      url: 'https://github.com/rono-007',
      year: '2024',
      links: {
        github: 'https://github.com/rono-007',
      },
    },
    {
      name: 'Ace The Code',
      category: 'Coding Education Platform',
      description:
        'Company-wise programming questions, DSA learning paths and interview preparation.',
      tags: ['DSA', 'Algorithms', 'EdTech'],
      videoSrc: work4,
      imageBg: workBg4,
      url: 'https://github.com/rono-007',
      year: '2024',
      links: {
        github: 'https://github.com/rono-007',
      },
    },
    {
      name: 'Shiuli',
      category: 'Kolkata Durga Puja Discovery Platform',
      description:
        'A platform to explore Durga Puja pandals, eateries, metro stations and nearby facilities across Kolkata, with location-based discovery and supporting map functionality.',
      tags: ['React 19', 'TypeScript', 'Vite', 'Python', 'FastAPI', 'MapLibre GL'],
      videoSrc: work1,
      imageBg: workBg5,
      url: 'https://shiuli.vercel.app',
      year: '2024',
      links: {
        live: 'https://shiuli.vercel.app',
        github: 'https://github.com/rono-007/Shiuli',
      },
    },
  ];

  // Reusable function to handle forward scroll animation
  const createForwardTimeline = (
    index: any,
    i: any,
    selectedWorksProps: any[],
  ) => {
    const tl = gsap.timeline({
      defaults: { duration: 0.3 },
    });

    // Set and move the #index element
    tl.set('#index', {
      yPercent: 100,
      onComplete: () => {
        index.value = Math.min(i, selectedWorksProps.length - 1);
      },
    }).to('#index', {
      yPercent: 0,
      ease: 'power1.inOut',
    });

    return tl;
  };

  // Reusable function to handle backward scroll animation
  const createBackwardTimeline = (index: any, i: any) => {
    const tl = gsap.timeline({ defaults: { duration: 0.3 } });

    // Set and move the #index element
    tl.set('#index', {
      yPercent: -100,
      onComplete: () => {
        index.value = Math.max(i, 0);
      },
    }).to('#index', {
      yPercent: 0,
      duration: 0.3,
      ease: 'power1.inOut',
    });

    return tl;
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        video.play();
        video.classList.remove('blur');
      }
    });
  };

  const stopAllVideos = () => {
    videoRefs.value?.map((video: HTMLVideoElement) => {
      if (video && !video.paused) {
        video.pause();
        video.currentTime = 0; // Reset video to the start
      }
    });
  };
  onBeforeMount(() => {
    selectedWorks.value = textSplitterIntoChar('Selected Works / ', true);
  });

  onMounted(() => {
    stopAllVideos();

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.75, // Trigger when 75% of the video is visible
    });

    // Observe each video element
    videoRefs.value?.forEach((video) => {
      observer.observe(video);
    });

    animateSplitText(
      '#selectedWorks .letters',
      '#selected-works-text',
      0.7,
      0.01,
      0,
    );

    // Apply GSAP animations to each div
    if (!isSmallScreen.value)
      gsap.utils.toArray('.work-card').forEach((div: any, i: any) => {
        gsap.timeline({ defaults: { duration: 0.7 } }).to(div, {
          scrollTrigger: {
            trigger: div,
            start: 'top 25%',
            end: 'bottom 25%',
            scrub: 0.01,
            onLeaveBack: () => {
              // Backward scroll animation
              if (index.value !== 0) {
                gsap.to('#index', {
                  yPercent: 100,
                  duration: 0.3,
                  ease: 'power4.inOut',
                  onComplete: () => {
                    createBackwardTimeline(index, i - 1);
                  },
                });
              }
            },
          },
          ease: 'power1.inOut',
          onComplete: () => {
            // Forward scroll animation
            if (index.value !== selectedWorksProps.length - 1) {
              gsap.to('#index', {
                yPercent: -100,
                duration: 0.3,
                ease: 'power4.inOut',
                onComplete: () => {
                  createForwardTimeline(index, i + 1, selectedWorksProps);
                },
              });
            }
          },
        });
      });
  });
</script>
