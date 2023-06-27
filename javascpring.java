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
