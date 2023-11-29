@PostMapping("/create")
    public String handleRequest(@RequestParam(name = "flag", required = false) Boolean flag) {
        if (flag == null) {
            // Case when the parameter is not passed
            return "No flag provided.";
        } else if (flag) {
            // Case when flag is true
            return "Flag is true.";
        } else {
            // Case when flag is false
            return "Flag is false.";
        }
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @PostMapping("/create")
    public String handleRequest(@RequestParam(name = "type", required = false) String type) {
        if (type != null && type.equals("serviceA")) {
            // Call ServiceA
            return serviceA();
        } else {
            // Call ServiceB
            return serviceB();
        }
    }

    private String serviceA() {
        // Logic for ServiceA
        return "Service A called.";
    }

    private String serviceB() {
        // Logic for ServiceB
        return "Service B called.";
    }
}



if (headerValue != null && !headerValue.isEmpty()) {
            return methodWithHeader();
        } else {
            return methodWithoutHeader();
        }


// Assuming host is a String variable and ENV is a String variable representing the environment

String host;
String ENV = "prod"; // Set ENV to "prod" or "uat" based on your environment

if ("prod".equals(ENV)) {
    // Use abcsolutions.google.com for the production environment
    host = "abcsolutions.google.com";
} else if ("uat".equals(ENV)) {
    // Use uat.abcsolutions.google.com for the UAT environment
    host = "uat.abcsolutions.google.com";
} else {
    // Handle other environments if needed
    host = "default.host.com";
}

// Now, you can use the 'host' variable in your modified if condition
if (host.equals(host)) {
    // Code to be executed if the condition is true for the determined host based on the environment
    System.out.println("Host is " + host);
} else {
    // Code to be executed if the condition is false
    System.out.println("Host is not " + host);
}



///////////////////
// ListService.java
import java.util.List;

@Service
public class ListService {

    public List<String> addOneToListItems(List<String> list) {
        List<String> updatedList = new ArrayList<>();
        for (String item : list) {
            int intValue = Integer.parseInt(item);
            updatedList.add(String.valueOf(intValue + 1));
        }
        return updatedList;
    }
}


// ListController.java
@RestController
@RequestMapping("/api")
public class ListController {

    private final ListService listService;

    public ListController(ListService listService) {
        this.listService = listService;
    }

    @PostMapping("/addOne")
    public ResponseEntity<List<String>> addOneToListItems(@RequestBody List<String> list) {
        List<String> updatedList = listService.addOneToListItems(list);
        return ResponseEntity.ok(updatedList);
    }
}




String encodedStatuses = URLEncoder.encode(joinedStatuses, StandardCharsets.UTF_8);


orgapache
    ================
    import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Service
public class IddService {

    private final HttpClient httpClient;

    public IddService() {
        this.httpClient = HttpClientBuilder.create().build();
    }

    public ResponseEntity<String> getMemberDetails(String loginId, List<String> statuses) {
        String endpoint = "https://api.example.com/members/" + loginId + "/idds";
        String joinedStatuses = String.join(",", statuses);
        String url;

        try {
            URIBuilder uriBuilder = new URIBuilder(endpoint);
            uriBuilder.addParameter("statuses", joinedStatuses);
            url = uriBuilder.build().toString();
        } catch (URISyntaxException e) {
            // Handle URI syntax exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        HttpGet request = new HttpGet(url);

        try {
            HttpResponse response = httpClient.execute(request);
            // Assuming the response body is of string type
            String responseBody = org.apache.http.util.EntityUtils.toString(response.getEntity());
            return ResponseEntity.ok(responseBody);
        } catch (IOException e) {
            // Handle IO exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


====================





import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class IddService {

    private final HttpClient httpClient;

    public IddService(HttpClient httpClient) {
        this.httpClient = httpClient;
    }

    public ResponseEntity<String> getMemberDetails(String loginId, List<String> statuses) {
        String endpoint = "https://api.example.com/members/" + loginId + "/idds";
        String joinedStatuses = String.join(",", statuses);
        String url = endpoint + "?statuses=" + joinedStatuses;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return ResponseEntity.ok(response.body());
        } catch (IOException | InterruptedException e) {
            // Handle exceptions
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IddController {

    private final IddService iddService;

    public IddController(IddService iddService) {
        this.iddService = iddService;
    }

    @GetMapping("/members/{loginId}/idds")
    public ResponseEntity<String> getMemberDetails(@PathVariable String loginId, @RequestParam("statuses") List<String> statuses) {
        return iddService.getMemberDetails(loginId, statuses);
    }
}







@RestController
public class IddController {

    private final IddService iddService;

    public IddController(IddService iddService) {
        this.iddService = iddService;
    }

    @GetMapping("/members/{loginId}/idds")
    public ResponseEntity<String> getMemberDetails(@PathVariable String loginId, @RequestParam("statuses") List<String> statuses) {
        String response = iddService.getMemberDetails(loginId, statuses);
        return ResponseEntity.ok(response);
    }
}


@Service
public class IddService {

    private final HttpClient httpClient;

    public IddService(HttpClient httpClient) {
        this.httpClient = httpClient;
    }

    public String getMemberDetails(String loginId, List<String> statuses) {
        String endpoint = "https://api.example.com/members/" + loginId + "/idds";
        String joinedStatuses = String.join(",", statuses);
        String url = endpoint + "?statuses=" + joinedStatuses;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (IOException | InterruptedException e) {
            // Handle exceptions
            e.printStackTrace();
        }

        return null;
    }
}
