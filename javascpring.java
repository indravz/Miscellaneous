
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
