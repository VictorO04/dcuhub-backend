-- CreateTable
CREATE TABLE "characters" (
    "character_id" SERIAL NOT NULL,
    "character" VARCHAR(50) NOT NULL,
    "identity" VARCHAR(50),
    "first_appearance_id" INTEGER NOT NULL,
    "abilities" VARCHAR(255),
    "personality" VARCHAR(100),
    "photo_url" VARCHAR(255),

    CONSTRAINT "characters_pkey" PRIMARY KEY ("character_id")
);

-- CreateTable
CREATE TABLE "movies" (
    "movie_id" SERIAL NOT NULL,
    "production_id" INTEGER NOT NULL,
    "director" VARCHAR(50),
    "synopsis" TEXT,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("movie_id")
);

-- CreateTable
CREATE TABLE "productions" (
    "production_id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "year" INTEGER NOT NULL,
    "dcu_order" INTEGER NOT NULL,
    "photo_url" VARCHAR(255),

    CONSTRAINT "productions_pkey" PRIMARY KEY ("production_id")
);

-- CreateTable
CREATE TABLE "series" (
    "series_id" SERIAL NOT NULL,
    "production_id" INTEGER NOT NULL,
    "director" VARCHAR(50),
    "synopsis" TEXT,
    "status" VARCHAR(20) NOT NULL,

    CONSTRAINT "series_pkey" PRIMARY KEY ("series_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "characters_character_key" ON "characters"("character");

-- CreateIndex
CREATE UNIQUE INDEX "productions_title_key" ON "productions"("title");

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "fk_characters_first_appearance" FOREIGN KEY ("first_appearance_id") REFERENCES "productions"("production_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "fk_movies_production" FOREIGN KEY ("production_id") REFERENCES "productions"("production_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "fk_series_production" FOREIGN KEY ("production_id") REFERENCES "productions"("production_id") ON DELETE CASCADE ON UPDATE NO ACTION;
