package org.ajdeveloppement.concours.webapi.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.ajdeveloppement.webserver.HttpMethod;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface JsonService {
	String key();
	HttpMethod[] methods() default HttpMethod.GET;
}
