package com.neupane.mvc.data.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.neupane.mvc.entity.Project;

public class ProjectValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return Project.class.equals(clazz);
	}

	@Override
	public void validate(Object obj, Errors errors) {
		Project project = (Project) obj;
		if (project.getName().length() < 5) {
			errors.rejectValue("name", "project.name", "the name is too short");
		}
	}

}
