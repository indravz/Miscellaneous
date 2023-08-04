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


for (NotificationData data : notificationDataList) {
    String ticker = data.getSecurity().getTicker();
    QuotesData quotesData = quotesService.getQuotes(ticker);

    // Assuming quotesData contains a field named 'changeFromPreviousClose'
    double changeFromPreviousClose = Double.parseDouble(quotesData.getQuote().getChangeFromPreviousClose());

    // Assuming data contains a field named 'shareQuantity'
    double shareQuantity = Double.parseDouble(data.getShareQuantity());

    // Calculate the new dailyChange
    double dailyChange = changeFromPreviousClose * shareQuantity;

    // Set the calculated dailyChange in the NotificationData object
    data.setDailyChange(String.valueOf(dailyChange));
}


import java.math.BigDecimal;
import java.math.RoundingMode;

// ...

for (NotificationData data : notificationDataList) {
    String ticker = data.getSecurity().getTicker();
    QuotesData quotesData = quotesService.getQuotes(ticker);

    // Assuming quotesData contains a field named 'changeFromPreviousClose'
    Double changeFromPreviousClose = Double.parseDouble(quotesData.getQuote().getChangeFromPreviousClose());

    // Assuming data contains fields named 'shareQuantity' and 'last'
    BigDecimal shareQuantity = new BigDecimal(data.getShareQuantity());
    BigDecimal last = new BigDecimal(quotesData.getQuote().getLast());

    // Calculate the new dailyChange
    BigDecimal dailyChange = shareQuantity.multiply(BigDecimal.valueOf(changeFromPreviousClose));

    // Calculate the dailyChangePercentage
    BigDecimal dailyChangePercentage = dailyChange
            .divide(last.multiply(shareQuantity), 4, RoundingMode.HALF_UP) // To get up to 4 decimal places
            .multiply(BigDecimal.valueOf(100))
            .setScale(2, RoundingMode.HALF_UP); // Set scale to 2 decimal places

    // Set the calculated values in the NotificationData object
    data.setDailyChange(dailyChange.toString());
    data.setDailyChangePercentage(dailyChangePercentage.toString());
}
