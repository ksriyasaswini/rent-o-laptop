name := """play-java-starter-example"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.7"

crossScalaVersions := Seq("2.11.12", "2.12.4")

libraryDependencies += guice

// Test Database
//libraryDependencies += "com.h2database" % "h2" % "1.4.197"
libraryDependencies ++= Seq(javaJpa, "org.hibernate" % "hibernate-entitymanager" % "5.3.7.Final")
libraryDependencies += "mysql" % "mysql-connector-java" % "8.0.13" // Installed MySQL 8.0.13

libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.36"
libraryDependencies += "com.amazonaws" % "aws-java-sdk" % "1.11.109"

libraryDependencies += "com.twilio.sdk" % "twilio" % "7.15.5"

// Testing libraries for dealing with CompletionStage...
libraryDependencies += "org.assertj" % "assertj-core" % "3.6.2" % Test
libraryDependencies += "org.awaitility" % "awaitility" % "2.0.0" % Test

// Make verbose tests
testOptions in Test := Seq(Tests.Argument(TestFrameworks.JUnit, "-a", "-v"))
