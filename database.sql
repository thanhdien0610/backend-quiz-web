CREATE DATABASE quiz;

-- public."Quiz" definition

-- Drop table

-- DROP TABLE "Quiz";

CREATE TABLE "Quiz" (
	id serial4 NOT NULL,
	"name" varchar(255) NULL,
	description text NULL,
	image bytea NULL,
	difficulty varchar(255) NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"deletedAt" timestamptz NULL,
	CONSTRAINT "Quiz_pkey" PRIMARY KEY (id)
);


-- public."Participant" definition

-- Drop table

-- DROP TABLE "Participant";

CREATE TABLE "Participant" (
	id serial4 NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NULL,
	username varchar(255) NULL,
	"role" varchar(255) NULL,
	image bytea NULL,
	refresh_token varchar(255) NULL,
	refresh_expired timestamptz NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"deletedAt" timestamptz NULL,
	CONSTRAINT "Participant_email_key" UNIQUE (email),	
	CONSTRAINT "Participant_pkey" PRIMARY KEY (id)
);

-- ALTER TABLE "Participant" ADD CONSTRAINT "Participant_refresh_token_pkey" PRIMARY KEY (refresh_token);

CREATE TABLE "KeyToken" (
	id serial4 NOT NULL,
	participant_id int4 NOT NULL,
	public_key varchar(255) NULL,	
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "KeyToken_pkey" PRIMARY KEY (id),
	CONSTRAINT "KeyToken_participant_id_fkey" FOREIGN KEY (participant_id) REFERENCES "Participant"(id) ON DELETE CASCADE ON UPDATE CASCADE
	
);

-- public."History" definition

-- Drop table

-- DROP TABLE "History";

CREATE TABLE "History" (
	id serial4 NOT NULL,
	participant_id int4 NOT NULL,
	quiz_id int4 NOT NULL,
	total_questions int4 NULL,
	total_correct int4 NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"deletedAt" timestamptz NULL,
	CONSTRAINT "History_pkey" PRIMARY KEY (id),
	CONSTRAINT "History_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES "Quiz"(id) ON UPDATE CASCADE
);


-- public."QuizQuestion" definition

-- Drop table

-- DROP TABLE "QuizQuestion";

CREATE TABLE "QuizQuestion" (
	id serial4 NOT NULL,
	description text NULL,
	image bytea NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"deletedAt" timestamptz NULL,
	quiz_id int4 NOT NULL,
	CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY (id),
	CONSTRAINT "QuizQuestion_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES "Quiz"(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."QuizParticipiantAnswer" definition

-- Drop table

-- DROP TABLE "QuizParticipiantAnswer";

CREATE TABLE "QuizParticipiantAnswer" (
	id serial4 NOT NULL,
	participant_id int4 NOT NULL,
	quiz_id int4 NOT NULL,
	question_id int4 NOT NULL,
	user_answers varchar(255) NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"deletedAt" timestamptz NULL,
	CONSTRAINT "QuizParticipiantAnswer_pkey" PRIMARY KEY (id),
	CONSTRAINT "QuizParticipiantAnswer_participant_id_fkey" FOREIGN KEY (participant_id) REFERENCES "Participant"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "QuizParticipiantAnswer_question_id_fkey" FOREIGN KEY (question_id) REFERENCES "QuizQuestion"(id) ON UPDATE CASCADE,
	CONSTRAINT "QuizParticipiantAnswer_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES "Quiz"(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."QuizAnswer" definition

-- Drop table

-- DROP TABLE "QuizAnswer";

CREATE TABLE "QuizAnswer" (
	id serial4 NOT NULL,
	description text NULL,
	correct_answer bool NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"deletedAt" timestamptz NULL,
	question_id int4 NOT NULL,
	CONSTRAINT "QuizAnswer_pkey" PRIMARY KEY (id),
	CONSTRAINT "QuizAnswer_question_id_fkey" FOREIGN KEY (question_id) REFERENCES "QuizQuestion"(id) ON UPDATE CASCADE
);


-- public."ParticipantQuiz" definition

-- Drop table

-- DROP TABLE "ParticipantQuiz";

CREATE TABLE "ParticipantQuiz" (
	participant_id int4 NOT NULL,
	quiz_id int4 NOT NULL,
	is_finish bool NULL DEFAULT false,
	time_start timestamptz NULL,
	time_end timestamptz NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"deletedAt" timestamptz NULL,
	CONSTRAINT "ParticipantQuiz_pkey" PRIMARY KEY (participant_id, quiz_id),
	CONSTRAINT "ParticipantQuiz_participant_id_fkey" FOREIGN KEY (participant_id) REFERENCES "Participant"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "ParticipantQuiz_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES "Quiz"(id) ON DELETE CASCADE ON UPDATE CASCADE
);