package com.neupane.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.neupane.mvc.entity.Project;
import com.neupane.mvc.entity.Sponsor;

@Controller
public class HomeController {

	@RequestMapping("/")
	public String goHome(Model model) {
		Project project = new Project();
		project.setName("First Project");
		project.setSponsor(new Sponsor("NASA", "555-555-5555", "nasa@nasa.com"));
		project.setDescription("This is a simple project");

		model.addAttribute("currentProject", project);
		return "home";
	}

}
