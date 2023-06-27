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
