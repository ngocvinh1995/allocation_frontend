package Com.IFI.InternalTool.BS.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Com.IFI.InternalTool.DS.DAO.UserDAO;
import Com.IFI.InternalTool.DS.Model.Employee;
import Com.IFI.InternalTool.DS.Model.UserBean;
import Com.IFI.InternalTool.Payloads.AuthToken;
import Com.IFI.InternalTool.Payloads.LoginRequest;
import Com.IFI.InternalTool.Security.JwtTokenUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserDAO userDAO;

	@Autowired
	JwtTokenUtil jwtTokenUtil;
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		logger.info("Login ... " + loginRequest.getUsername());
		UserBean bean = new UserBean();
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())

			);
			final Employee user = userDAO.findUserByUserName(loginRequest.getUsername());
			SecurityContextHolder.getContext().setAuthentication(authentication);
			final String token = jwtTokenUtil.generateToken(user);
			bean.setUsername(user);
			bean.setToken(token);
			bean.setMessage("Login Successfully");
		} catch (AuthenticationException e) {
			bean.setUsername(null);
			bean.setToken(null);
			bean.setMessage(e.getMessage());
		}

		return new ResponseEntity<UserBean>(bean, HttpStatus.OK);
	}

	// @PostMapping("/signup")
	// public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest
	// signUpRequest) {
	// if(userDAO.existsByUsername(signUpRequest.getUsername())) {
	// return new ResponseEntity(new ApiResponse(false, "Username is already
	// taken!"),
	// HttpStatus.BAD_REQUEST);
	// }
	//
	// if(userDAO.existsByEmail(signUpRequest.getEmail())) {
	// return new ResponseEntity(new ApiResponse(false, "Email Address already in
	// use!"),
	// HttpStatus.BAD_REQUEST);
	// }
	//
	// // Creating user's account
	// Employee user = new Employee(signUpRequest.getName(),
	// signUpRequest.getUsername(),
	// signUpRequest.getEmail(), signUpRequest.getPassword());
	//
	// user.setPassword(passwordEncoder.encode(user.getPassword()));
	//
	// Role userRole = roleDAO.findByName(RoleName.ROLE_USER)
	// .orElseThrow(() -> new AppException("User Role not set."));
	//
	// user.setRoles(Collections.singleton(userRole));
	//
	// Employee result = userDAO.save(user);
	//
	// URI location = ServletUriComponentsBuilder
	// .fromCurrentContextPath().path("/users/{username}")
	// .buildAndExpand(result.getUsername()).toUri();
	//
	// return ResponseEntity.created(location).body(new ApiResponse(true, "User
	// registered successfully"));
	// }
}