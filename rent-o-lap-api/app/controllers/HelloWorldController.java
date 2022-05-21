package controllers;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class HelloWorldController extends Controller {

    public Result helloWorld(){

        return ok("hello world");
    }

    public Result hellosri(){

        return ok("Hello sri !!");
    }


    public Result hello(String name){

        return ok("Hello "+name);
    }


    public Result hellos(String name, Integer count){

        StringBuffer sb = new StringBuffer();

        for(int i=0;i<count;i++){

            String message = "hello "+name;
            sb.append(message+"\n");
        }
        return ok(sb.toString());
    }


    public Result greeting(){

        final JsonNode json = request().body().asJson();

        final String firstname = json.get("first_name").asText();
        final String lastname = json.get("last_name").asText();

         //final Person person = Json.fromJson(json, Person.class);

        String message = "Hello "+firstname+" "+lastname;
        //final String message = "Hello " + person.getFirstName() +

        return ok(message);
    }

    public Result me(){

        final Person me = new Person("sri" , "yasaswini");
        final JsonNode json = Json.toJson(me);

        return ok(json);
    }


    static class Person {

        @JsonProperty("first_name")
        String FirstName;

        @JsonProperty("last_name")
        String LastName;

        public Person() {

        }

        public Person(String firstName, String lastName) {
            this.FirstName = firstName;
            this.LastName = lastName;
        }

        public String getLastName() {
            return LastName;
        }

        public void setLastName(String lastName) {
            this.LastName = lastName;
        }

        public String getFirstName() {
            return FirstName;
        }

        public void setFirstName(String firstName) {
            this.FirstName = firstName;
        }
    }

}
