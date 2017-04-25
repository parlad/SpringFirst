package com.neupane.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.neupane.mvc.entity.Project;

@Controller
public class HomeController {

	@RequestMapping("/")
	public String goHome(Model model) {
		Project project = new Project();
		project.setName("First Project");
		project.setSponsor("NASA");
		project.setDescription("This is a simple project");

		model.addAttribute("currentProject", project);
		return "home";
	}

}
