import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DailyChangeNotificationService {

    private final RestTemplate restTemplate;
    private final ApiV1AssetsQuotesService quotesService;

    @Autowired
    public DailyChangeNotificationService(RestTemplate restTemplate, ApiV1AssetsQuotesService quotesService) {
        this.restTemplate = restTemplate;
        this.quotesService = quotesService;
    }

    public List<NotificationData> getDailyChangeNotifications() {
        // Make a GET request to the upstream URL and get the list of JSON objects
        String upstreamUrl = "https://example.com/upstream-data";
        ResponseEntity<List<NotificationData>> response = restTemplate.exchange(
                upstreamUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<NotificationData>>() {
                });

        List<NotificationData> notificationDataList = response.getBody();
        
        // Update dailyChange field for each object using getQuotes
        for (NotificationData data : notificationDataList) {
            String ticker = data.getSecurity().getTicker();
            QuotesData quotesData = quotesService.getQuotes(ticker);
            data.setDailyChange(quotesData.getQuote().getDailyChange());
        }

        return notificationDataList;
    }
}
