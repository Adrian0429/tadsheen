"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Navigation, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import Link from "next/link";
import Loading from "./components/Loading";

type Quiz = {
  id: string;
  title: string;
  description: string;
};

export default function Home() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getquiz")
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-white h-nav">
      {/* Header Section */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 md:px-12 text-2xl font-bold text-indigo-600 mb-8">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Improve
            <br />
            Your Skill!
          </h1>
          <div className="bg-indigo-600 rounded-xl p-4 md:p-6 text-white mt-4">
            <p className="text-sm sm:text-base">
              Do you like quizzes and competitions? <br />
              Find or create quizzes on any topic here! <br />
              Play, share, and study your favorite topics.
            </p>
          </div>
        </div>
        <Image
          src="/quiz.png"
          width={300}
          height={300}
          alt="Quiz Illustration"
          className="h-auto w-full max-w-xs md:max-w-sm animate-bounceSlow"
        />
      </div>

      <div>
        <h2 className="text-center text-2xl font-semibold text-slate-700 mb-4">
          Explore Quizzes
        </h2>
        {quizzes.length > 0 ? (
          <Swiper
            modules={[Navigation, Grid]}
            spaceBetween={20}
            slidesPerView={1}
            grid={{
              rows: 2,
              fill: "row",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            className=""
          >
            {quizzes.map((quiz) => (
              <SwiperSlide key={quiz.id}>
                <Link href={`/quiz/${quiz.id}`}>
                  <div className="bg-indigo-50/50 shadow-md rounded-lg p-4 hover:shadow-lg hover:bg-indigo-100 transition duration-300 cursor-pointer">
                    <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-gray-600">{quiz.description}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-gray-600">No quizzes available.</div>
        )}
      </div>
    </div>
  );
}
